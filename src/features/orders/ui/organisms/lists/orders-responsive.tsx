"use client";

import dynamic from "next/dynamic";

import type { Order } from "@/features/orders/types/order.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { ListSkeleton } from "@/shared/ui/molecules/list-skeleton";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";

interface OrdersListResponsiveProps {
  orders: Order[];
  onOpenDetails: (order: Order) => void;
}

const OrdersListDesktop = dynamic(() => import("./orders-desktop").then((m) => m.OrdersListDesktop), {
  loading: () => <TableSkeleton rows={8} columns={6} />,
});

const OrdersListMobile = dynamic(() => import("./orders-mobile").then((m) => m.OrdersListMobile), {
  loading: () => <ListSkeleton rows={6} />,
});

export function OrdersListResponsive(props: OrdersListResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return (
      <div className="bg-muted/30 text-muted-foreground rounded-md border py-8 text-center text-sm">
        Подготовка списка заказов…
      </div>
    );
  }

  return isMobile ? <OrdersListMobile {...props} /> : <OrdersListDesktop {...props} />;
}
