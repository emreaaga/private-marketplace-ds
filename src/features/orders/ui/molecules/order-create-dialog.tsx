"use client";

import * as React from "react";

import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/shared/ui/atoms/dialog";
import { EntitySearch } from "@/shared/ui/molecules/entity-search";

import { CLIENTS } from "../../fake-clients";
import { SELLERS } from "../../fake-sellers";

import { ProductList } from "./product-list";

interface OrderCreateDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
  sellerId?: string;
}

export function OrderCreateDialog({ open, onOpenChange, children }: OrderCreateDialogProps) {
  const [seller, setSeller] = React.useState<any | null>(null);
  const [client, setClient] = React.useState<any | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Создать заказ</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <EntitySearch label="Продавец" placeholder="ID продавца" data={SELLERS} onChange={setSeller} />

          <EntitySearch label="Клиент" placeholder="ID клиента" data={CLIENTS} onChange={setClient} />
        </div>

        <ProductList />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>

          <Button onClick={() => onOpenChange(false)}>Создать заказ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
