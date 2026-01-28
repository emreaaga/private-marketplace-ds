"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";

type ListItem = {
  companyId: number;
  shipment: Shipment;
};

export type ShipmentListHandle = {
  getShipmentIds: () => number[];
};

export const ShipmentList = forwardRef<ShipmentListHandle, object>(function ShipmentList(_props, ref) {
  const [list, setList] = useState<ListItem[]>([]);
  const [companyId, setCompanyId] = useState<number | undefined>();

  const [rawShipments, setRawShipments] = useState<Shipment[]>([]);
  const [loadingShipments, setLoadingShipments] = useState(false);

  const [selectedShipmentId, setSelectedShipmentId] = useState<string>("");

  const shipments = useMemo(() => (companyId ? rawShipments : []), [companyId, rawShipments]);
  const selectedIds = useMemo(() => new Set(list.map((i) => i.shipment.id)), [list]);

  useImperativeHandle(
    ref,
    () => ({
      getShipmentIds: () => list.map((i) => i.shipment.id),
    }),
    [list],
  );

  useEffect(() => {
    if (!companyId) return;

    ShipmentsService.getShipments({ company_id: companyId, status: "draft" })
      .then(setRawShipments)
      .finally(() => setLoadingShipments(false));
  }, [companyId]);

  function removeShipment(shipmentId: number) {
    setList((prev) => prev.filter((i) => i.shipment.id !== shipmentId));
  }

  function addShipment(shipmentId: number) {
    if (!companyId) return;
    if (selectedIds.has(shipmentId)) return;

    const shipment = shipments.find((s) => s.id === shipmentId);
    if (!shipment) return;

    setList((prev) => [...prev, { companyId, shipment }]);
  }

  const placeholder = !companyId ? "Отправки" : loadingShipments ? "Загрузка..." : "Отправка";

  return (
    <div className="max-w-xl divide-y rounded-md border text-xs">
      {list.map((item) => (
        <div key={item.shipment.id} className="flex items-center gap-3 px-3 py-2">
          <span className="text-muted-foreground w-40 truncate">{item.shipment.company_name}</span>

          <div className="text-muted-foreground flex items-center gap-1">
            <span>{item.shipment.id}</span>
            <span>·</span>
            <span>{formatWeight(item.shipment.total_weight_kg)}</span>
            <span>·</span>
            <span>{formatQuantity(item.shipment.orders_count)}</span>
          </div>

          <div className="ml-auto flex items-center">
            <button
              type="button"
              onClick={() => removeShipment(item.shipment.id)}
              className="text-muted-foreground hover:text-red-600"
              title="Удалить"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <div className="bg-muted/30 flex items-center gap-1 px-0.5 py-0.5">
        <CompanySelect
          value={companyId}
          placeholder="Компания"
          type="postal"
          onChange={(id) => {
            setCompanyId(id);
            setSelectedShipmentId("");
            setRawShipments([]);
            setLoadingShipments(true);
          }}
        />

        <Select
          value={selectedShipmentId}
          onValueChange={(value) => {
            setSelectedShipmentId("");
            addShipment(Number(value));
          }}
          disabled={!companyId || loadingShipments}
        >
          <SelectTrigger className="h-8 w-48 text-xs">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {shipments.map((s) => (
              <SelectItem key={s.id} value={String(s.id)} disabled={selectedIds.has(s.id)}>
                {s.id} · {formatWeight(s.total_weight_kg)} · {formatQuantity(s.orders_count, { unit: "шт" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});
