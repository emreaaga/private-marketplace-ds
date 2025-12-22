"use client";

import { useState } from "react";

import { toast } from "sonner";

import { fakeOrders } from "@/features/orders/fake-orders";
import type { Order } from "@/features/orders/types/order.types";
import { OrderDetailsDialog } from "@/features/orders/ui/molecules/order-details-dialog";
import { OrdersListResponsive } from "@/features/orders/ui/organisms/lists/orders-responsive";
import { OrdersToolbar } from "@/features/orders/ui/organisms/sections/orders-toolbar";

export default function SellerOrdersPage() {
  const [orders] = useState<Order[]>(fakeOrders);
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
    <div className="space-y-6">
      <OrdersToolbar open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <OrdersListResponsive orders={orders} onOpenDetails={handleOpenDetails} />

      <OrderDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        order={selectedOrder}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
