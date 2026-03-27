"use client";

import { useState } from "react";

import { CircleDollarSign, Package, Truck, Weight } from "lucide-react";

import { TripRouteSidebar } from "@/entities/trip";
import { Button } from "@/shared/ui/atoms/button";
import { formatMoney } from "@/shared/ui/molecules/format-money";
import { formatQuantity } from "@/shared/ui/molecules/format-quantity";
import { formatWeight } from "@/shared/ui/molecules/format-weight";
import { StatCard } from "@/shared/ui/stat-card";

const MOCK_TRIP = {
  id: "1",
  status: "on_way",
  driver: "Begzod",
  vehicle: "Isuzu",
  total_weight: "1470.45",
  total_remaining: "2540.45",
  stops: [
    { id: "s1", code: "TAS", name: "Ташкент", status: "delivered", orders_count: 10 },
    { id: "s2", code: "SKD", name: "Самарканд", status: "pending", orders_count: 20 },
    { id: "s3", code: "BKH", name: "Бухара", status: "pending", orders_count: 15 },
  ],
};

const MOCK_ORDERS = [
  { id: 501, public_id: "ORD-9921", receiver: "Иван Иванов", weight: "12.5", amount: "1200", status: "in_transit" },
  { id: 502, public_id: "ORD-9922", receiver: "Алишер Каримов", weight: "5.0", amount: "500", status: "in_transit" },
  { id: 503, public_id: "ORD-9923", receiver: "Марина Петрова", weight: "8.2", amount: "950", status: "in_transit" },
];

export default function TripDetailsPage({ params }: { params: { id: string } }) {
  const [selectedStopId, setSelectedStopId] = useState(MOCK_TRIP.stops[1].id);
  const selectedStop = MOCK_TRIP.stops.find((s) => s.id === selectedStopId);

  return (
    <div className="space-y-6 px-2 py-4">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <StatCard icon={Truck} label="Транспорт" value={MOCK_TRIP.vehicle} />
        <StatCard icon={Package} label="Заказы" value={formatQuantity(45, { unit: "шт" })} />
        <StatCard icon={Weight} label="Общий вес" value={formatWeight(MOCK_TRIP.total_weight)} />
        <StatCard icon={CircleDollarSign} label="К сбору" value={formatMoney(MOCK_TRIP.total_remaining)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-2">
          <TripRouteSidebar stops={MOCK_TRIP.stops} selectedStopId={selectedStopId} onSelect={setSelectedStopId} />
        </div>

        <div className="lg:col-span-10">
          <div className="flex h-10 items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-muted-foreground/50" />
              <h3 className="text-[15px] font-semibold tracking-tight">
                Заказы: <span className="text-muted-foreground font-normal">{selectedStop?.name}</span>
              </h3>
            </div>

            <div className="flex items-center">
              {selectedStop?.status === "pending" && (
                <Button
                  variant="primary"
                  size="sm"
                  className="h-8 bg-black px-3 text-[11px] font-bold text-white hover:bg-black/90"
                >
                  Подтвердить выгрузку
                </Button>
              )}
            </div>
          </div>

          <div className="border-border/60 bg-background overflow-hidden rounded-lg border shadow-none">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/20 text-muted-foreground border-border/60 border-b text-[11px] font-bold tracking-tight uppercase">
                <tr>
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Получатель</th>
                  <th className="px-4 py-2.5">Вес</th>
                  <th className="px-4 py-2.5">Сумма</th>
                  <th className="px-4 py-2.5 text-right">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-border/40 divide-y">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="text-muted-foreground px-4 py-3 font-mono text-[11px]">{order.public_id}</td>
                    <td className="px-4 py-3 text-[13px] font-medium">{order.receiver}</td>
                    <td className="text-muted-foreground px-4 py-3 text-[13px]">{order.weight} кг</td>
                    <td className="px-4 py-3 text-[13px] font-bold">{formatMoney(order.amount)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-[10px] font-bold tracking-tighter uppercase">
                        В пути
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
