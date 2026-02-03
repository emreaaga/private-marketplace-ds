"use client";

import { useEffect, useMemo, useState } from "react";

import { flightsService } from "@/features/flights/api/flights";
import type { Flight } from "@/shared/types/flight/flight.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { FlightsToolbar } from "../../logistics/flights/_components/flights-toolbar";
import { EditFlightDialog } from "../_components/edit-flight-dialog";
import { createFlightsActionsColumn } from "../_components/flight-columns.actions";
import { flightsBaseColumns } from "../_components/flight-columns.base";

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);

  const columns = useMemo(() => [...flightsBaseColumns, createFlightsActionsColumn(setEditId)], []);

  useEffect(() => {
    flightsService
      .getFlights()
      .then(setFlights)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <FlightsToolbar />

      <DataTable columns={columns} data={flights} emptyMessage={loading ? "Загрузка..." : "Рейсы не найдены"} />

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
