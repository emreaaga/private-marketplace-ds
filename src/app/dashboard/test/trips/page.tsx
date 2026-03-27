"use client";

import { useMemo, useState } from "react";

import { getTripsColumns, MOCK_TRIPS } from "@/entities/trip";
import { TripDetailDialog } from "@/features/trips-detail";
import { DataTable } from "@/widgets/data-table/ui/data-table";
import { TripsToolbar } from "@/widgets/trips-toolbar";

export default function TripsPage() {
  const [page, setPage] = useState(1);
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  const columns = useMemo(() => getTripsColumns(setSelectedTripId), []);

  return (
    <div className="space-y-4">
      <TripsToolbar />

      <DataTable
        columns={columns}
        data={MOCK_TRIPS}
        emptyMessage="Рейсы не найдены"
        serverPagination={{
          page,
          pageCount: 1,
          onPageChange: setPage,
        }}
        fixedPageSize={10}
      />

      <TripDetailDialog
        tripId={selectedTripId}
        open={selectedTripId !== null}
        onOpenChangeAction={(open) => !open && setSelectedTripId(null)}
      />
    </div>
  );
}
