"use client";
import { useEffect, useMemo, useState } from "react";

import { DollarSign, Package, Scale, Weight } from "lucide-react";

import { flightsService } from "@/features/flights/api/flights";
import type { Flight } from "@/shared/types/flight/flight.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { FlightsToolbar } from "../../logistics/flights/_components/flights-toolbar";
import { StatCard } from "../../main/_components/stat-card";
import { EditFlightDialog } from "../_components/edit-flight-dialog";
import { createFlightsColumns } from "../_components/flight-columns";

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);

  const columns = useMemo(() => createFlightsColumns((id) => setEditId(id)), []);

  useEffect(() => {
    flightsService
      .getFlights()
      .then(setFlights)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Всего рейсов" value={0} icon={Package} />
        <StatCard label="Общий вес" value={"0 кг"} icon={Weight} />
        <StatCard label="Общий доход" value="$0" icon={DollarSign} />
        <StatCard label="Общий баланс" value="$0" icon={Scale} />
      </div>*/}

      <FlightsToolbar />

      <DataTable columns={columns} data={flights} emptyMessage={loading ? "Загрузка..." : "Рейсы не найдены"} />

      <EditFlightDialog
        open={editId != null}
        flightId={editId}
        onOpenChangeAction={(o) => {
          if (!o) setEditId(null);
        }}
      />
    </div>
  );
}
