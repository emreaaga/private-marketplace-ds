import { DataTable } from "@/widgets/data-table/ui/data-table";

import { MOCK_SHIPMENTS } from "./_components/mock-shipment";
import { ShipmentColumns } from "./_components/shipment-columns";
import { Shipment } from "./_components/types";

export default function ShipmentPage() {
  return (
    <div className="space-y-4">
      <DataTable<Shipment> columns={ShipmentColumns} data={MOCK_SHIPMENTS} />
    </div>
  );
}
