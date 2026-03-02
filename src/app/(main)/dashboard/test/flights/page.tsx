"use client";

import { useMemo, useState } from "react";

import { useFlightsList } from "@/features/flights/queries/use-flights-list";
import type { Flight } from "@/shared/types/flight/flight.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { EditFlightDialog } from "./_components/edit-flight-dialog";
import { createFlightsColumns } from "./_components/flight-columns";
import { FlightExpandedRow } from "./_components/flight-expanded-row";
import { FlightsToolbar } from "./_components/flights-toolbar";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function FlightsPage() {
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState<number | null>(null);

  const { data, isLoading, isError } = useFlightsList({ page });

  const flights: Flight[] = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const columns = useMemo(() => createFlightsColumns(setEditId), []);

  const emptyMessage = isLoading ? "Загрузка..." : isError ? "Не удалось загрузить рейсы" : "Рейсы не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  return (
    <div className="space-y-4">
      <FlightsToolbar />

      <DataTable
        columns={columns}
        data={flights}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
        renderExpandedRow={FlightExpandedRow}
      />

      <EditFlightDialog
        open={editId !== null}
        flightId={editId}
        onOpenChangeAction={(open) => {
          if (!open) setEditId(null);
        }}
      />
    </div>
  );
}
