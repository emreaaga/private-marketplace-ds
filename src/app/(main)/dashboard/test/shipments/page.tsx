"use client";

import { useEffect, useState } from "react";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import { Shipment } from "@/shared/types/shipment/shipment.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentToolbar } from "../../logistics/shipments/_components/shipment-toolbar";

import { ShipmentsColumns } from "./_components/shipment-columns";

export default function FlightShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ShipmentsService.getShipments()
      .then(setShipments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <ShipmentToolbar />

      <DataTable columns={ShipmentsColumns} data={shipments} />
    </div>
  );
}
