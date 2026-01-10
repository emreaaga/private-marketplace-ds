import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { FlightsColumns, MOCK_FLIGHTS, Flight } from "./_components/flights-columns";
import { FlightsToolbar } from "./_components/flights-toolbar";
// import { DemoFakeFlights } from "./_components/demo-fake-flights";
// import { DemoFlightsColumns } from "./_components/demo-flights-columns";
// import { Flight } from "./_components/types";

export default function ShipmentPage() {
  return (
    <div className="space-y-4">
      <FlightsToolbar />
      <DataTable<Flight> columns={FlightsColumns} data={MOCK_FLIGHTS} />
    </div>
  );
}
