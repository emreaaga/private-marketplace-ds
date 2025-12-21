"use client";

import { ListFilter, PlusIcon, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { OrderCreateDialog } from "@/features/orders/ui/molecules/order-create-dialog";
import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";

function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex h-9 flex-1 items-center justify-center gap-2 p-0 md:flex-none md:px-3"
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Button>
  );
}

interface OrdersHeaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrdersHeader({ open, onOpenChange }: OrdersHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full gap-2 md:max-w-xl md:flex-row">
        <InputGroup className="flex h-9 flex-1">
          <InputGroupInput placeholder="Поиск" className="h-9 flex-1" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>

        <OrderCreateDialog open={open} onOpenChange={onOpenChange}>
          <Button size="sm" className="h-9 flex-1 gap-2 md:flex-none">
            <PlusIcon className="h-4 w-4" />
            <span className="md:inline">Создать</span>
            <span className="hidden md:inline">заказ</span>
          </Button>
        </OrderCreateDialog>
      </div>

      <div className="flex w-full gap-2 md:w-auto md:justify-end">
        <IconButton icon={<SlidersHorizontal />} label="Сортировка" />
        <IconButton icon={<ListFilter />} label="Фильтры" />
        <IconButton icon={<RotateCcw />} label="Сбросить" />
      </div>
    </div>
  );
}
