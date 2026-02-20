"use client";

import { useMemo, useState } from "react";

import { useShipmentsList } from "@/features/shipments/queries/use-shipments-list";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentToolbar } from "../../logistics/shipments/_components/shipment-toolbar";
import { ShipmentDetailDialog } from "../_components/shipment-edit-dialog";

import { getShipmentsColumns } from "./_components/shipment-columns";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function FlightShipmentsPage() {
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState<number | null>(null);

  const { data, isLoading, isError } = useShipmentsList({ page });

  const shipments = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const columns = useMemo(() => getShipmentsColumns(setViewId), []);

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  const emptyMessage = isLoading
    ? "Загрузка..."
    : isError
      ? "Не удалось загрузить отправления"
      : "Отправления не найдены";

  return (
    <div className="space-y-4">
      <ShipmentToolbar />

      <DataTable
        columns={columns}
        data={shipments}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />

      <ShipmentDetailDialog
        open={viewId !== null}
        shipmentId={viewId}
        onOpenChangeAction={(open) => !open && setViewId(null)}
      />
    </div>
  );
}
