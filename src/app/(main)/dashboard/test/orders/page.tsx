"use client";

import { Package, DollarSign, CreditCard, AlertTriangle } from "lucide-react";

import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { StatCard } from "../../main/_components/stat-card";

import { MOCK_ORDERS } from "./_components/mock-orders";
import { OrdersColumns } from "./_components/orders-columns";
import { getOrdersStats } from "./_components/orders-stats";

export default function OrdersPage() {
  const stats = getOrdersStats(MOCK_ORDERS);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Всего заказов" value={stats.totalOrders} icon={Package} />

        <StatCard label="Общая стоимость" value={`${stats.totalIncome.toFixed(2)} $`} icon={DollarSign} />

        <StatCard label="Оплачено" value={`${stats.totalPaid.toFixed(2)} $`} icon={CreditCard} />

        <StatCard
          label="Остаток к сбору"
          value={`${stats.totalRemaining.toFixed(2)} $`}
          icon={AlertTriangle}
          variant={stats.totalRemaining > 0 ? "danger" : "default"}
        />
      </div>

      <DataTable columns={OrdersColumns} data={MOCK_ORDERS} emptyMessage="Заказы не найдены" />
    </div>
  );
}
