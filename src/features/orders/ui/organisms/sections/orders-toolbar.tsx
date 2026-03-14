"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { Info, ListFilter, LucideIcon, Plus, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

const OrderCreateDialog = dynamic(
  () => import("@/features/orders/ui/organisms/create-order-dialog").then((m) => m.CreateOrderDialog),
  {
    ssr: false,
    loading: () => null,
  },
);

interface OrdersToolbarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipmentId?: number;
  canCreate?: boolean;
}

export function OrdersToolbar({ open, onOpenChange, shipmentId, canCreate = true }: OrdersToolbarProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 py-1">
        <div className="flex flex-1 items-center gap-3">
          {shipmentId && (
            <div className="border-border/40 bg-background/50 flex h-8 shrink-0 items-center gap-1.5 rounded-md border px-2.5 shadow-sm">
              <span className="text-muted-foreground/50 text-[10px] font-bold tracking-tight uppercase">OTP</span>
              <span className="font-mono text-[13px] leading-none font-bold">{shipmentId}</span>
            </div>
          )}

          <div className="group relative flex max-w-md flex-1 items-center">
            <Search className="text-muted-foreground/40 group-focus-within:text-primary/70 absolute left-2.5 h-3.5 w-3.5 transition-colors" />
            <input
              placeholder="Поиск заказов..."
              className="border-border/40 bg-background/50 placeholder:text-muted-foreground/40 focus:border-border/80 focus:bg-background focus:ring-primary/5 hover:border-border/60 h-8 w-full rounded-md border pr-3 pl-8 text-[13px] shadow-sm transition-all focus:ring-1 focus:outline-none"
            />
          </div>

          <div className="hidden items-center gap-1.5 lg:flex">
            <ToolbarButton Icon={SlidersHorizontal} label="Сортировка" />
            <ToolbarButton Icon={ListFilter} label="Фильтры" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!canCreate && shipmentId && (
            <div className="flex items-center gap-1.5 rounded-md border border-dashed border-orange-500/20 bg-orange-500/5 px-3 py-1.5 text-orange-600/80 dark:text-orange-400/80">
              <Info size={12} />
              <span className="text-[11px] leading-none font-medium tracking-tight">Добавление закрыто</span>
            </div>
          )}

          <button
            onClick={() => {}}
            className="border-border/40 text-muted-foreground/50 hover:bg-muted hover:border-border/80 hover:text-muted-foreground bg-background/50 flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition-all active:scale-95"
            title="Сбросить фильтры"
          >
            <RotateCcw size={13} strokeWidth={2.5} />
          </button>

          {canCreate && (
            <Button
              size="sm"
              variant="primary"
              onMouseEnter={() => setShouldLoad(true)}
              onClick={() => onOpenChange(true)}
            >
              <Plus size={14} strokeWidth={3} />
              <span className="text-[12px] font-bold tracking-tight">Создать заказ</span>
            </Button>
          )}
        </div>
      </div>

      {canCreate && (open || shouldLoad) && (
        <OrderCreateDialog open={open} onOpenChange={onOpenChange} shipmentId={shipmentId} />
      )}
    </>
  );
}

function ToolbarButton({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <button className="border-border/40 text-muted-foreground/70 hover:bg-muted hover:border-border/80 hover:text-foreground bg-background/50 flex h-8 items-center gap-2 rounded-md border px-2.5 text-[12px] font-medium shadow-sm transition-all active:scale-95">
      <Icon size={14} strokeWidth={2} className="text-muted-foreground/40" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
