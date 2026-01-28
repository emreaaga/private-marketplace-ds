"use client";
import { useEffect, useState } from "react";

import { Package, Layers, Weight, DollarSign, Scale } from "lucide-react";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import { Shipment } from "@/shared/types/shipment/shipment.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ShipmentToolbar } from "../../logistics/shipments/_components/shipment-toolbar";
import { StatCard } from "../../main/_components/stat-card";

import { MOCK_SHIPMENTS } from "./_components/mock-shipments";
import { ShipmentsColumns } from "./_components/shipment-columns";
import { getShipmentsStats } from "./_components/shipments-stats";

export default function FlightShipmentsPage() {
  const stats = getShipmentsStats(MOCK_SHIPMENTS);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ShipmentsService.getShipments()
      .then(setShipments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Отправки" value={stats.totalShipments} icon={Layers} />

        <StatCard label="Общий вес" value={`${stats.totalWeight} кг`} icon={Weight} />

        <StatCard label="Доход" value={`${stats.totalIncome.toFixed(2)} $`} icon={DollarSign} />

        <StatCard
          label="Баланс рейса"
          value={`${stats.balance.toFixed(2)} $`}
          icon={Scale}
          variant={stats.balance < 0 ? "danger" : "default"}
        />
      </div> */}

      <ShipmentToolbar />

      <DataTable columns={ShipmentsColumns} data={shipments} />
    </div>
  );
}
