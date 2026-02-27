"use client";

import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/atoms/dialog";

import { OrderCreateFormContent } from "./order-create-form-content";

interface Props {
  open: boolean;

  onOpenChange: (v: boolean) => void;
}

export function CreateOrderDialog({ open, onOpenChange }: Props) {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh]! max-h-[calc(100vh-2rem)]! w-350! max-w-[calc(100vw-2rem)]! flex-col overflow-hidden border-none p-0 shadow-2xl">
        <DialogTitle className="sr-only">Создание заказа</DialogTitle>

        {open && <OrderCreateFormContent onSuccess={handleClose} onCancel={handleClose} />}
      </DialogContent>
    </Dialog>
  );
}
