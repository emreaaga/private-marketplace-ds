"use client";
import { DollarSign, Package, Scale, Weight } from "lucide-react";

import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { StatCard } from "../../main/_components/stat-card";
import { getFlightsStats } from "../_components/cards-helper";
import { FlightsColumns } from "../_components/flight-columns";
import { MOCK_FLIGHTS } from "../_components/mock-flights";

export default function FlightsPage() {
  const stats = getFlightsStats(MOCK_FLIGHTS);
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Всего рейсов" value={stats.totalFlights} icon={Package} />

        <StatCard label="Общий вес" value={`${stats.totalWeight} кг`} icon={Weight} />

        <StatCard label="Общий доход" value={`${stats.totalIncome.toFixed(2)} $`} icon={DollarSign} />

        <StatCard
          label="Общий баланс"
          value={`${stats.balance.toFixed(2)} $`}
          icon={Scale}
          variant={stats.balance < 0 ? "danger" : "default"}
        />
      </div>

      <DataTable columns={FlightsColumns} data={MOCK_FLIGHTS} />
    </div>
  );
}
