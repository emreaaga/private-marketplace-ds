import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentToolbar } from "../shipments/_components/shipment-toolbar";

import { FakeFlights } from "./_components/fake-flights";
import { FlightsColumns } from "./_components/flights-columns";
import { Flight } from "./_components/types";

export default function ShipmentPage() {
  return (
    <div className="space-y-4">
      <ShipmentToolbar />
      <DataTable<Flight> columns={FlightsColumns} data={FakeFlights} />
    </div>
  );
}
