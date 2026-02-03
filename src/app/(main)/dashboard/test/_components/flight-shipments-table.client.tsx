"use client";

import { Shipment } from "@/shared/types/shipment/shipment.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentsColumns } from "../shipments/_components/shipment-columns";

export function FlightShipmentsTable({ data }: { data: Shipment[] }) {
  return <DataTable columns={ShipmentsColumns} data={data} emptyMessage="Отправки не найдены" />;
}
