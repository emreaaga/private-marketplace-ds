"use client";

import type { Order } from "@/features/orders/types/order.types";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/shared/ui/atoms/card";

function StatusBadge({ status }: { status: Order["status"] }) {
  const map = {
    pending: "bg-yellow-500/15 text-yellow-700",
    confirmed: "bg-green-500/15 text-green-700",
    canceled: "bg-red-500/15 text-red-700",
  };

  return (
    <Badge variant="secondary" className={`rounded-full px-3 py-1 text-xs ${map[status]}`}>
      {status === "pending" && "Ожидание"}
      {status === "confirmed" && "Подтвержден"}
      {status === "canceled" && "Отменён"}
    </Badge>
  );
}

interface OrdersListMobileProps {
  orders: Order[];
  onOpenDetails: (order: Order) => void;
}

export function OrdersListMobile({ orders, onOpenDetails }: OrdersListMobileProps) {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <Card key={order.id} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-base font-semibold">
              <span className="font-mono">#{order.id}</span>
            </CardTitle>
            <StatusBadge status={order.status} />
          </CardHeader>

          <CardContent className="p-4 pt-0 text-sm">
            <div className="font-medium">{order.customer}</div>
            <div className="text-muted-foreground">{order.total.toLocaleString()} $</div>
            <div className="text-muted-foreground mt-1 text-xs">{order.date}</div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button variant="secondary" size="sm" className="w-full" onClick={() => onOpenDetails(order)}>
              Детали заказа
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
