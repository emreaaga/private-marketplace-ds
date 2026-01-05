"use client";

import { useState, useMemo } from "react";

import { fakeOrders } from "@/features/logistics/types/fake-orders";
import { getLogisticsColumns } from "@/features/logistics/types/logistics-table-columns";
import type { Order } from "@/features/logistics/types/order.types";
import { LogisticsOrdersResponsive } from "@/features/logistics/ui/organisms/logistics-orders-responsive";
import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";

export default function LogisticsOrdersPage() {
  const [orders] = useState<Order[]>(fakeOrders);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const columns = useMemo(() => getLogisticsColumns(), []);

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <LogisticsOrdersResponsive data={orders} columns={columns} />
    </div>
  );
}
