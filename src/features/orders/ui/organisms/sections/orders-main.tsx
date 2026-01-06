"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { toast } from "sonner";

import type { Order } from "@/features/orders/types/order.types";
import { OrdersListResponsive } from "@/features/orders/ui/organisms/lists/orders-responsive";
import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";

const OrderDetailsDialog = dynamic(
  () => import("@/features/orders/ui/molecules/order-details-dialog").then((m) => m.OrderDetailsDialog),
  { ssr: false },
);

type Props = {
  orders: Order[];
};

export function OrdersMain({ orders }: Props) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedOrder) return;

    if (selectedOrder.status !== "pending") {
      toast.info("Этот заказ уже обработан.");
      setIsDetailsOpen(false);
      return;
    }

    toast.success(`Заказ #${selectedOrder.id} подтверждён`);
    setIsDetailsOpen(false);
  };

  return (
    <div className="space-y-4">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <OrdersListResponsive orders={orders} onOpenDetails={handleOpenDetails} />

      {isDetailsOpen && selectedOrder && (
        <OrderDetailsDialog open onOpenChange={setIsDetailsOpen} order={selectedOrder} onConfirm={handleConfirm} />
      )}
    </div>
  );
}
