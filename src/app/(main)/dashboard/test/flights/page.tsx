"use client";
import { useEffect, useState } from "react";

import { DollarSign, Package, Scale, Weight } from "lucide-react";

import { flightsService } from "@/features/flights/api/flights";
import { Flight } from "@/shared/types/flight/flight.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { FlightsToolbar } from "../../logistics/flights/_components/flights-toolbar";
import { StatCard } from "../../main/_components/stat-card";
import { FlightsColumns } from "../_components/flight-columns";

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flightsService
      .getFlights()
      .then(setFlights)
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Всего рейсов" value={0} icon={Package} />

        <StatCard label="Общий вес" value={"0 кг"} icon={Weight} />

        <StatCard label="Общий доход" value="$0" icon={DollarSign} />

        <StatCard label="Общий баланс" value="$0" icon={Scale} />
      </div>

      <FlightsToolbar />

      <DataTable columns={FlightsColumns} data={flights} emptyMessage={loading ? "Загрузка..." : "Рейсы не найдены"} />
    </div>
  );
}
