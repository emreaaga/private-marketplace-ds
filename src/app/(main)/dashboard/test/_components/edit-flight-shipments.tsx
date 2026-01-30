"use client";

import { useMemo, useRef, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { FlightShipment } from "@/shared/types/flight/flight.dto";
import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import type { EditFlightFormValues } from "./edit-flight-dialog";

type ShipmentLike = {
  id: number;
  company_name: string;
  total_weight_kg: unknown;
  orders_count: unknown;
};

function num2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

function toShipmentLike(s: FlightShipment | Shipment): ShipmentLike {
  return {
    id: s.id,
    company_name: s.company_name,
    total_weight_kg: s.total_weight_kg,
    orders_count: s.orders_count,
  };
}

type Props = {
  initialShipments: FlightShipment[];
};

export function EditFlightShipments({ initialShipments }: Props) {
  const { control, getValues, setValue } = useFormContext<EditFlightFormValues>();

  const selectedIds = useWatch({
    control,
    name: "shipments",
    defaultValue: initialShipments.map((s) => s.id),
  });

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const [companyId, setCompanyId] = useState<number | undefined>();
  const [companyShipments, setCompanyShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>("");

  const [cache, setCache] = useState<Map<number, ShipmentLike>>(
    () => new Map(initialShipments.map((s) => [s.id, toShipmentLike(s)])),
  );

  const reqSeq = useRef(0);

  const shipmentsById = useMemo(() => {
    const m = new Map<number, ShipmentLike>();

    for (const s of initialShipments) m.set(s.id, toShipmentLike(s));
    for (const [id, s] of cache) m.set(id, s);

    return m;
  }, [initialShipments, cache]);

  async function loadCompanyShipments(id: number) {
    const seq = ++reqSeq.current;
    setLoading(true);

    try {
      const data = await ShipmentsService.getShipments({ company_id: id, status: "draft" });

      if (seq !== reqSeq.current) return;

      setCompanyShipments(data);
      setCache((prev) => {
        const next = new Map(prev);
        for (const s of data) next.set(s.id, toShipmentLike(s));
        return next;
      });
    } catch {
      if (seq === reqSeq.current) {
        setCompanyShipments([]);
        toast.error("Не удалось загрузить отправки");
      }
    } finally {
      if (seq === reqSeq.current) setLoading(false);
    }
  }

  function addShipment(id: number) {
    const current = getValues("shipments");
    if (current.includes(id)) return;
    setValue("shipments", [...current, id], { shouldDirty: true, shouldValidate: true });
  }

  function removeShipment(id: number) {
    const current = getValues("shipments");
    setValue(
      "shipments",
      current.filter((x) => x !== id),
      { shouldDirty: true, shouldValidate: true },
    );
  }

  const emptyList = Boolean(companyId) && !loading && companyShipments.length === 0;
  const selectDisabled = !companyId || loading;

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Отправки</div>
        <div className="text-muted-foreground text-xs">{selectedIds.length} шт</div>
      </div>

      <div className="min-h-0 flex-1">
        <ScrollArea className="bg-background h-full rounded-md border">
          {selectedIds.length === 0 ? (
            <div className="text-muted-foreground px-4 py-4 text-sm">Нет отправок</div>
          ) : (
            <div className="divide-y">
              {selectedIds.map((id) => {
                const s = shipmentsById.get(id);

                return (
                  <div key={id} className="flex items-start justify-between gap-3 px-4 py-2">
                    <div className="text-muted-foreground text-sm">
                      #{id} · {s?.company_name ?? "—"}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground text-xs whitespace-nowrap">
                        {s ? `${num2(s.total_weight_kg)} кг · ${Number(s.orders_count)} шт` : "—"}
                      </div>

                      <button
                        type="button"
                        className="text-muted-foreground hover:text-red-600"
                        title="Удалить"
                        onClick={() => removeShipment(id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="flex gap-2">
        <div className="w-[260px] shrink-0">
          <CompanySelect
            type="postal"
            placeholder="Компания"
            value={companyId}
            onChange={(id) => {
              setCompanyId(id);
              setSelectedShipmentId("");
              setCompanyShipments([]);

              if (!id) {
                reqSeq.current++;
                setLoading(false);
                return;
              }

              void loadCompanyShipments(id);
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <Select
            value={selectedShipmentId}
            onValueChange={(v) => {
              setSelectedShipmentId("");
              const id = Number(v);
              if (Number.isFinite(id)) addShipment(id);
            }}
            disabled={selectDisabled}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue
                placeholder={
                  !companyId ? "Выберите компанию" : loading ? "Загрузка..." : emptyList ? "Нет отправок" : "Отправка"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {emptyList ? (
                <SelectItem value="__empty__" disabled>
                  Нет отправок
                </SelectItem>
              ) : (
                companyShipments.map((s) => (
                  <SelectItem key={s.id} value={String(s.id)} disabled={selectedSet.has(s.id)}>
                    #{s.id} · {num2(s.total_weight_kg)} кг · {Number(s.orders_count)} шт
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
