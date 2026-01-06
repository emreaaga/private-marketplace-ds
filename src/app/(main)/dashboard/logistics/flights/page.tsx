import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentToolbar } from "../shipments/_components/shipment-toolbar";

import { DemoFakeFlights } from "./_components/demo-fake-flights";
import { DemoFlightsColumns } from "./_components/demo-flights-columns";
import { FakeFlights } from "./_components/fake-flights";
import { FlightsColumns } from "./_components/flights-columns";
import { Flight } from "./_components/types";

export interface Flight2 {
  id: string;
  code: string;
  route: string[];
  participantsCount: number;
  shipmentsCount: number;
  totalWeightKg: number;
  totalAmount: number;
  currency: "USD" | "EUR";
  status: "planned" | "in_transit" | "customs" | "delivered";
  departureAt: string;
  arrivalEta: string;
}

export default function ShipmentPage() {
  return (
    <div className="space-y-4">
      <ShipmentToolbar />
      {/* <DataTable<Flight> columns={FlightsColumns} data={FakeFlights} /> */}
      <DataTable<Flight2> columns={DemoFlightsColumns} data={DemoFakeFlights} />
    </div>
  );
}
