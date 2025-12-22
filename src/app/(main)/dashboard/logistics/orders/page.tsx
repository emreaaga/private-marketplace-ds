"use client";

import { useState } from "react";

import { fakeOrders } from "@/features/logistics/types/fake-orders";
import { getLogisticsColumns } from "@/features/logistics/types/logistics-table-columns";
import type { Order } from "@/features/logistics/types/order.types";
import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export default function LogisticsOrdersPage() {
  const [orders] = useState<Order[]>(fakeOrders);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="space-y-6">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <DataTable data={orders} columns={getLogisticsColumns()} />
    </div>
  );
}
