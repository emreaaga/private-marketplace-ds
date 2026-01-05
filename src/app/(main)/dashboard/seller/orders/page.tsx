"use client";

import { useState, useMemo } from "react";

import { getLogisticsColumns } from "@/features/logistics/types/logistics-table-columns";
import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";

import { fakeOrders } from "./_components/fake-seller-orders";
import { Order } from "./_components/orders.type";
import { getSellersOrdersColumns } from "./_components/sellers-orders-columns";
import SellersOrdersResponsive from "./_components/sellers-orders-responsive";

export default function SellerOrdersPage() {
  const [orders] = useState<Order[]>(fakeOrders);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const columns = useMemo(() => getSellersOrdersColumns(), []);

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />
      <SellersOrdersResponsive data={orders} columns={columns} />
    </div>
  );
}
