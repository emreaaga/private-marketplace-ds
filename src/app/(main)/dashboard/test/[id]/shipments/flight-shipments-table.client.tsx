"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { useShipmentsList } from "@/features/shipments/queries/flight-shipments/use-shipments-list";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { getShipmentsColumns } from "../../shipments/_components/shipment-columns";

const ShipmentDetailDialog = dynamic(
  () => import("../../_components/shipment-edit-dialog").then((m) => m.ShipmentDetailDialog),
  { ssr: false },
);

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export function FlightShipmentsTable({ flightId }: { flightId: number }) {
  const [page, setPage] = useState(1);
  const [viewId, setViewId] = useState<number | null>(null);

  const [shouldLoad, setShouldLoad] = useState(false);

  const { data, isLoading, isError } = useShipmentsList({ page, flight_id: flightId });

  const shipments = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const columns = useMemo(() => getShipmentsColumns(setViewId, () => setShouldLoad(true)), []);

  const emptyMessage = isLoading
    ? "Загрузка..."
    : isError
      ? "Не удалось загрузить отправления"
      : "Отправления не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight">Отправки рейса {flightId}</h1>
      </div>
      <DataTable
        columns={columns}
        data={shipments}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />

      {(viewId !== null || shouldLoad) && (
        <ShipmentDetailDialog
          open={viewId !== null}
          shipmentId={viewId}
          onOpenChangeAction={(open) => !open && setViewId(null)}
        />
      )}
    </div>
  );
}
