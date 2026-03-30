"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { getTripsColumns, useTripsList } from "@/entities/trip";
import { DataTable } from "@/widgets/data-table/ui/data-table";
import { TripsToolbar } from "@/widgets/trips-toolbar";

const TripDetailDialog = dynamic(() => import("@/features/trips-detail").then((m) => m.TripDetailDialog), {
  ssr: false,
});

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function TripsPage() {
  const [page, setPage] = useState(1);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const { data, isLoading, isError } = useTripsList({ page });

  const trips = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  const columns = useMemo(() => getTripsColumns(setSelectedTripId, () => setShouldLoad(true)), []);

  const emptyMessage = isLoading ? "Загрузка рейсов..." : isError ? "Не удалось загрузить рейсы" : "Рейсы не найдены";

  return (
    <div className="space-y-4">
      <TripsToolbar />

      <DataTable
        columns={columns}
        data={trips}
        emptyMessage={emptyMessage}
        serverPagination={{
          page,
          pageCount,
          onPageChange,
        }}
        fixedPageSize={10}
      />

      {(selectedTripId !== null || shouldLoad) && (
        <TripDetailDialog
          tripId={selectedTripId}
          open={selectedTripId !== null}
          onOpenChangeAction={(open) => !open && setSelectedTripId(null)}
        />
      )}
    </div>
  );
}
