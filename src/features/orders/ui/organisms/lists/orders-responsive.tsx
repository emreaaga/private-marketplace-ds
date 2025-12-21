"use client";

import type { Order } from "@/features/orders/types/order.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";

import { OrdersListDesktop } from "./orders-desktop";
import { OrdersListMobile } from "./orders-mobile";

interface OrdersListResponsiveProps {
  orders: Order[];
  onOpenDetails: (order: Order) => void;
}

export function OrdersListResponsive(props: OrdersListResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm">Загрузка...</p>
      </div>
    );
  }

  return isMobile ? <OrdersListMobile {...props} /> : <OrdersListDesktop {...props} />;
}
