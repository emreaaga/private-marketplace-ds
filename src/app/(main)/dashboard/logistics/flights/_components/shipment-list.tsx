"use client";

import { useEffect, useMemo, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

type SelectedRowProps = {
  id: number;
  shipment?: Shipment;
  onRemove: (id: number) => void;
};

function SelectedRow({ id, shipment, onRemove }: SelectedRowProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <span className="text-muted-foreground w-40 truncate">{shipment?.company_name ?? "—"}</span>

      <div className="text-muted-foreground flex items-center gap-1">
        <span>{id}</span>
        <span>·</span>
        <span>{shipment ? formatWeight(shipment.total_weight_kg) : "—"}</span>
        <span>·</span>
        <span>{shipment ? formatQuantity(shipment.orders_count) : "—"}</span>
      </div>

      <div className="ml-auto flex items-center">
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="text-muted-foreground hover:text-red-600"
          title="Удалить"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function ShipmentList() {
  const { control, setValue } = useFormContext<FlightFormValues>();

  const selected = useWatch({ control, name: "shipments", defaultValue: [] });

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const [companyId, setCompanyId] = useState<number | undefined>();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [shipmentsById, setShipmentsById] = useState<Map<number, Shipment>>(() => new Map());
  const [loading, setLoading] = useState(false);

  const [selectedShipmentId, setSelectedShipmentId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!companyId) return;

    let cancelled = false;

    ShipmentsService.getShipments({ company_id: companyId, status: "draft" })
      .then((data) => {
        if (cancelled) return;

        setShipments(data);
        setShipmentsById((prev) => {
          const next = new Map(prev);
          for (const s of data) next.set(s.id, s);
          return next;
        });
      })
      .catch(() => {
        if (cancelled) return;
        setShipments([]);
        toast.error("Не удалось загрузить отправки");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [companyId]);

  function addShipment(id: number) {
    if (selectedSet.has(id)) return;
    setValue("shipments", [...selected, id], { shouldValidate: true, shouldDirty: true });
  }

  function removeShipment(id: number) {
    setValue(
      "shipments",
      selected.filter((x) => x !== id),
      { shouldValidate: true, shouldDirty: true },
    );
  }

  const placeholder = !companyId ? "Отправки" : loading ? "Загрузка..." : "Отправка";
  const selectDisabled = !companyId || loading;

  return (
    <div className="max-w-xl divide-y rounded-md border text-xs">
      {selected.map((id) => (
        <SelectedRow key={id} id={id} shipment={shipmentsById.get(id)} onRemove={removeShipment} />
      ))}

      <div className="bg-muted/30 flex items-center gap-1 px-0.5 py-0.5">
        <CompanySelect
          value={companyId}
          placeholder="Компания"
          type="postal"
          onChange={(id) => {
            setCompanyId(id);
            setSelectedShipmentId(undefined);
            setShipments([]);
            setLoading(Boolean(id));
          }}
        />

        <Select
          value={selectedShipmentId}
          onValueChange={(value) => {
            setSelectedShipmentId(undefined);

            const id = Number(value);
            if (Number.isFinite(id)) addShipment(id);
          }}
          disabled={selectDisabled}
        >
          <SelectTrigger className="h-8 w-48 text-xs">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {!loading && companyId && shipments.length === 0 ? (
              <SelectItem value="__empty__" disabled>
                Нет отправок
              </SelectItem>
            ) : (
              shipments.map((s) => (
                <SelectItem key={s.id} value={String(s.id)} disabled={selectedSet.has(s.id)}>
                  {s.id} · {formatWeight(s.total_weight_kg)} · {formatQuantity(s.orders_count, { unit: "шт" })}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
