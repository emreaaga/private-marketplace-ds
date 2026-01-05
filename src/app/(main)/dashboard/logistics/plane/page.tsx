import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentToolbar } from "../shipment/_components/shipment-toolbar";

import { MOCK_PLANE } from "./_components/mock-plane";
import { PlaneColumns, Plane } from "./_components/plane-columns";

export default function ShipmentPage() {
  return (
    <div className="space-y-4">
      <ShipmentToolbar />
      <DataTable<Plane> columns={PlaneColumns} data={MOCK_PLANE} />
    </div>
  );
}
