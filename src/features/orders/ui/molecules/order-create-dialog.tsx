"use client";
import * as React from "react";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/shared/ui/atoms/drawer";
import { EntitySearch } from "@/shared/ui/molecules/entity-search";

import { CLIENTS } from "../../fake-clients";
import { SELLERS } from "../../fake-sellers";

import { ProductList } from "./product-list";

interface OrderCreateDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  sellerId?: string;
}

function OrderCreateContent({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [seller, setSeller] = React.useState<any | null>(null);
  const [client, setClient] = React.useState<any | null>(null);

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <>
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        <EntitySearch label="Продавец" placeholder="ID продавца" data={SELLERS} onChange={setSeller} />
        <EntitySearch label="Клиент" placeholder="ID клиента" data={CLIENTS} onChange={setClient} />
      </div>

      <ProductList />

      <div className="flex gap-2 pt-4 md:justify-end">
        <Button variant="outline" onClick={onClose} className="flex-1 md:flex-initial">
          Отмена
        </Button>
        <Button onClick={handleSubmit} className="flex-1 md:flex-initial">
          Создать заказ
        </Button>
      </div>
    </>
  );
}

export function OrderCreateDialog({ open, onOpenChange }: OrderCreateDialogProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[95vh]">
          <DrawerHeader className="border-b">
            <DrawerTitle>Создать заказ</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <OrderCreateContent onClose={() => onOpenChange(false)} onSubmit={() => console.log("Order created")} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Создать заказ</DialogTitle>
        </DialogHeader>
        <OrderCreateContent onClose={() => onOpenChange(false)} onSubmit={() => console.log("Order created")} />
      </DialogContent>
    </Dialog>
  );
}
