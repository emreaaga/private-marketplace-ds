"use client";

import { DataTable } from "@/widgets/data-table/ui/data-table";

import { FAKE_FLIGHTS } from "./_components/fake-flights"; // Импорт данных
import { FlightsColumns } from "./_components/flights-columns";
import { Flight } from "./_components/flights.type"; // Импорт типа

export default function ShipmentPage() {
  return (
    <div className="space-y-4">
      <DataTable<Flight> columns={FlightsColumns} data={FAKE_FLIGHTS} />
    </div>
  );
}
