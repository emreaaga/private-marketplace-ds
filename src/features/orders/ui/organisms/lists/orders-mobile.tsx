"use client";
import type { Order } from "@/features/orders/types/order.types";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";

function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    pending: "bg-yellow-500/15 text-yellow-700",
    confirmed: "bg-green-500/15 text-green-700",
    canceled: "bg-red-500/15 text-red-700",
  };
  return (
    <Badge variant="secondary" className={`rounded-full px-2 py-0.5 text-[10px] ${map[status]}`}>
      {status === "pending" && "Ожидание"}
      {status === "confirmed" && "Подтвержден"}
      {status === "canceled" && "Отменён"}
    </Badge>
  );
}

interface OrderCardMobileProps {
  order: Order;
  onOpenDetails: (order: Order) => void;
}

function OrderCardMobile({ order, onOpenDetails }: OrderCardMobileProps) {
  return (
    <div className="flex flex-col p-3">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex flex-1 flex-col space-y-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[15px] font-semibold">#{order.id}</p>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-[15px] font-medium">{order.customer}</p>
          <p className="text-muted-foreground text-sm font-semibold">{order.total.toLocaleString()} $</p>
          <p className="text-muted-foreground pt-1 text-[10px]">{order.date}</p>
        </div>
      </div>
      <Button variant="secondary" size="sm" className="h-8 w-full text-xs" onClick={() => onOpenDetails(order)}>
        Детали заказа
      </Button>
    </div>
  );
}

interface OrdersListMobileProps {
  orders: Order[];
  onOpenDetails: (order: Order) => void;
}

export function OrdersListMobile({ orders, onOpenDetails }: OrdersListMobileProps) {
  if (!orders.length) {
    return <div className="text-muted-foreground py-8 text-center text-sm">Нет результатов</div>;
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-lg border md:hidden">
      <div className="divide-border divide-y">
        {orders.map((order) => (
          <OrderCardMobile key={order.id} order={order} onOpenDetails={onOpenDetails} />
        ))}
      </div>
    </div>
  );
}
