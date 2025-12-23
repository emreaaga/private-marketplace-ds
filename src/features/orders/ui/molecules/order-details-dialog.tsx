"use client";

import { useEffect, useState } from "react";

import type { Order } from "@/features/orders/types/order.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/atoms/drawer";

function StatusBadge({ status }: { status: Order["status"] }) {
  const map: Record<Order["status"], string> = {
    pending: "bg-yellow-500/15 text-yellow-700",
    confirmed: "bg-green-500/15 text-green-700",
    canceled: "bg-red-500/15 text-red-700",
  };

  return (
    <Badge variant="secondary" className={`rounded-full px-3 py-1 text-xs font-medium ${map[status]}`}>
      {status === "pending" && "Ожидание"}
      {status === "confirmed" && "Подтвержден"}
      {status === "canceled" && "Отменён"}
    </Badge>
  );
}

interface OrderDetailsDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  order: Order | null;
  onConfirm: () => void;
}

function OrderDetailsContent({
  order,
  onConfirm,
  onClose,
}: {
  order: Order;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-muted/40 grid gap-4 rounded-xl border px-4 py-3 text-sm sm:grid-cols-3">
        <div className="space-y-1">
          <div className="text-muted-foreground text-xs">Покупатель</div>
          <div className="font-medium">{order.customer}</div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground text-xs">Товаров</div>
          <div className="font-medium">{order.items.length}</div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground text-xs">Сумма</div>
          <div className="font-semibold">{order.total.toLocaleString()} $</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium">Товары в заказе</div>
        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {order.items.map((item, idx) => {
            const lineTotal = item.price * item.qty;
            return (
              <div key={idx} className="bg-card flex items-center justify-between rounded-xl border px-4 py-3">
                <div className="space-y-1">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-muted-foreground text-xs">SKU: {item.sku}</div>
                  <div className="text-muted-foreground text-xs">
                    {item.qty} × {item.price.toLocaleString()} $
                  </div>
                </div>

                <div className="text-sm font-semibold">{lineTotal.toLocaleString()} $</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-4 text-base font-semibold">
        <span>Итого к оплате</span>
        <span>{order.total.toLocaleString()} $</span>
      </div>

      <div className="flex gap-2 pt-2">
        {order.status === "pending" ? (
          <>
            <Button onClick={onConfirm} className="flex-1">
              Подтвердить заказ
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Отмена
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={onClose} className="w-full">
            Закрыть
          </Button>
        )}
      </div>
    </div>
  );
}

export function OrderDetailsDialog({ open, onOpenChange, order, onConfirm }: OrderDetailsDialogProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) return null;

  if (!order) return null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <DrawerTitle className="text-lg font-semibold">
                  <span className="font-mono">#{order.id}</span>
                </DrawerTitle>
                <DrawerDescription>
                  {order.date} · {order.customer}
                </DrawerDescription>
              </div>
              <StatusBadge status={order.status} />
            </div>
          </DrawerHeader>

          <div className="overflow-y-auto px-4 pb-4">
            <OrderDetailsContent order={order} onConfirm={onConfirm} onClose={() => onOpenChange(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold">
                Заказ <span className="font-mono">#{order.id}</span>
              </DialogTitle>
              <DialogDescription>
                Оформлен {order.date} · {order.customer}
              </DialogDescription>
            </div>
            <StatusBadge status={order.status} />
          </div>
        </DialogHeader>

        <div className="pt-1">
          <OrderDetailsContent order={order} onConfirm={onConfirm} onClose={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
