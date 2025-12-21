"use client";

import { PlusIcon } from "lucide-react";

import { OrderCreateDialog } from "@/features/orders/ui/molecules/order-create-dialog";
import { Button } from "@/shared/ui/atoms/button";

interface OrdersHeaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrdersHeader({ open, onOpenChange }: OrdersHeaderProps) {
  return (
    <div className="flex items-center justify-end">
      <OrderCreateDialog open={open} onOpenChange={onOpenChange}>
        <Button size="sm" className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Создать заказ
        </Button>
      </OrderCreateDialog>
    </div>
  );
}
