"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/atoms/dialog";

import { useOrderDetail } from "../../queries/user-order-detail";

import { OrderEditFormContent } from "./order-edit-form-content";

interface OrderEditDialogProps {
  open: boolean;
  orderId: number | null;
  onOpenChange: (v: boolean) => void;
}

export function OrderEditDialog({ open, orderId, onOpenChange }: OrderEditDialogProps) {
  const { data: order, isLoading, isError } = useOrderDetail(orderId);

  const hasActualError = isError && orderId !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh]! max-h-[calc(100vh-2rem)]! w-[1400px]! max-w-[calc(100vw-2rem)]! flex-col overflow-hidden border-none p-0 shadow-2xl">
        <DialogTitle className="sr-only">Редактирование заказа</DialogTitle>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="text-primary/60 h-10 w-10 animate-spin" />
            </div>
          ) : hasActualError ? (
            <div className="text-destructive flex flex-1 items-center justify-center font-medium">
              Ошибка при получении данных заказа.
            </div>
          ) : order && orderId ? (
            <OrderEditFormContent key={order.id} order={order} />
          ) : (
            <div className="bg-background flex-1" />
          )}
        </div>

        <div className="bg-muted/20 flex shrink-0 justify-end gap-2 border-t px-4 py-2">
          <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button size="sm" disabled={isLoading || !!hasActualError || !order}>
            Сохранить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
