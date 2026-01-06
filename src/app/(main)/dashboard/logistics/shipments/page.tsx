import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { MOCK_SHIPMENTS } from "./_components/mock-shipment";
import { ShipmentColumns } from "./_components/shipment-columns";
import { ShipmentToolbar } from "./_components/shipment-toolbar";
import { Shipment } from "./_components/types";

export default function ShipmentPage() {
  return (
    <div className="space-y-4">
      <ShipmentToolbar />
      <DataTable<Shipment> columns={ShipmentColumns} data={MOCK_SHIPMENTS} />
    </div>
  );
}
