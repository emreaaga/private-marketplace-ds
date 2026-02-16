"use client";

import { useMemo, useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { useShipmentsList } from "@/features/shipments/queries/flight-shipments/use-shipments-list";
import type { Shipment } from "@/shared/types/shipment/shipment.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentsColumns } from "../../../shipments/_components/shipment-columns";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export function FlightShipmentsTable({ flightId }: { flightId: number }) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useShipmentsList({ page, flight_id: flightId });

  const shipments = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

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
    <DataTable
      columns={ShipmentsColumns}
      data={shipments}
      emptyMessage={emptyMessage}
      serverPagination={{ page, pageCount, onPageChange }}
      fixedPageSize={10}
    />
  );
}
