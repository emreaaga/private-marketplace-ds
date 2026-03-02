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
      <DialogContent className="flex h-[85vh]! max-h-[calc(100vh-2rem)]! w-350! max-w-[calc(100vw-2rem)]! flex-col overflow-hidden border-none p-0 shadow-2xl">
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

        <div className="bg-background border-border/40 flex shrink-0 justify-end gap-2 border-t px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-border/40 hover:bg-muted h-8 rounded-lg px-4 text-[13px] font-medium transition-colors"
          >
            Отмена
          </Button>
          <Button
            size="sm"
            disabled={isLoading || !!hasActualError || !order}
            className="bg-foreground text-background hover:bg-foreground/90 h-8 min-w-35 rounded-lg text-[13px] font-bold transition-all active:scale-[0.98]"
          >
            {isLoading ? "Сохранение..." : "Сохранить изменения"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
