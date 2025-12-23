"use client";

import { useState, useMemo } from "react";

import { fakeOrders } from "@/features/logistics/types/fake-orders";
import { getLogisticsColumns } from "@/features/logistics/types/logistics-table-columns";
import type { Order } from "@/features/logistics/types/order.types";
import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export default function LogisticsOrdersPage() {
  const [orders] = useState<Order[]>(fakeOrders);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const columns = useMemo(() => getLogisticsColumns(), []);

  return (
    <div className="space-y-6">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <DataTable data={orders} columns={columns} />
    </div>
  );
}
