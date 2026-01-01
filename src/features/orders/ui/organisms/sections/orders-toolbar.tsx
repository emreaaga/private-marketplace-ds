"use client";
import { useState } from "react";

import dynamic from "next/dynamic";

import { ListFilter, PlusIcon, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { IconButton } from "@/shared/ui/molecules/icon-button";

const OrderCreateDialog = dynamic(
  () =>
    import("@/features/orders/ui/molecules/order-create-stepper/order-create-stepper-dialog").then(
      (m) => m.OrderCreateStepperDialog,
    ),
  { loading: () => null },
);

interface OrdersHeaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrdersToolbar({ open, onOpenChange }: OrdersHeaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full gap-2 md:max-w-xl md:flex-row">
        <InputGroup className="flex h-9 flex-1">
          <InputGroupInput placeholder="Поиск" className="h-9 flex-1" />
          <InputGroupAddon>
            <Search className="text-muted-foreground h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>
        <Button
          size="sm"
          className="h-9 flex-1 md:flex-none"
          onClick={() => onOpenChange(true)}
          onMouseEnter={() => setShouldLoad(true)}
        >
          <PlusIcon className="h-3 w-3" />
          <span className="md:inline">Создать</span>
          <span className="hidden md:inline">заказ</span>
        </Button>
      </div>
      <div className="flex w-full gap-2 md:w-auto md:justify-end">
        <IconButton Icon={SlidersHorizontal} label="Сортировка" />
        <IconButton Icon={ListFilter} label="Фильтры" />
        <IconButton Icon={RotateCcw} label="Сбросить" />
      </div>
      {(open || shouldLoad) && <OrderCreateDialog open={open} onOpenChange={onOpenChange} />}
    </div>
  );
}
