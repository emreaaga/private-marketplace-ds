"use client";

import { useState } from "react";

import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { MOCK_ORDERS } from "./_components/mock-orders";
import { OrdersColumns } from "./_components/orders-columns";

export default function OrdersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <DataTable columns={OrdersColumns} data={MOCK_ORDERS} emptyMessage="Заказы не найдены" />
    </div>
  );
}
