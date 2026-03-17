"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { ListFilter, Plus, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

const ShipmentCreateDialog = dynamic(() => import("@/features/shipment-create").then((m) => m.ShipmentCreateDialog), {
  ssr: false,
  loading: () => null,
});

interface ShipmentToolbarProps {
  flightId?: number;
}

export function ShipmentToolbar({ flightId }: ShipmentToolbarProps) {
  const [open, setOpen] = useState(false);

  const preloadDialog = () => {
    if (!flightId) import("@/features/shipment-create");
  };

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 py-1">
        <div className="flex flex-1 items-center gap-3">
          {flightId && (
            <div className="border-border/40 bg-background/50 flex h-8 shrink-0 items-center gap-1.5 rounded-md border px-2.5 shadow-sm">
              <span className="text-muted-foreground/50 text-[10px] font-bold tracking-tight uppercase">FLY</span>
              <span className="font-mono text-[13px] leading-none font-bold">{flightId}</span>
            </div>
          )}

          <div className="group relative flex max-w-md flex-1 items-center">
            <Search className="text-muted-foreground/40 group-focus-within:text-primary/70 absolute left-2.5 h-3.5 w-3.5 transition-colors" />
            <input
              placeholder="Поиск отправки..."
              className="border-border/40 bg-background/50 placeholder:text-muted-foreground/40 focus:border-border/80 focus:bg-background focus:ring-primary/5 hover:border-border/60 h-8 w-full rounded-md border pr-3 pl-8 text-[13px] shadow-sm transition-all focus:ring-1 focus:outline-none"
            />
          </div>

          <div className="hidden items-center gap-1.5 lg:flex">
            <Button variant="action" size="sm" className="px-2.5">
              <SlidersHorizontal size={14} strokeWidth={2} className="text-muted-foreground/40" />
              <span className="hidden sm:inline">Сортировка</span>
            </Button>
            <Button variant="action" size="sm" className="px-2.5">
              <ListFilter size={14} strokeWidth={2} className="text-muted-foreground/40" />
              <span className="hidden sm:inline">Фильтры</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="border-border/40 text-muted-foreground/50 hover:bg-muted hover:border-border/80 hover:text-muted-foreground bg-background/50 flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition-all active:scale-95"
            title="Сбросить фильтры"
          >
            <RotateCcw size={13} strokeWidth={2.5} />
          </button>

          {!flightId && (
            <Button
              size="sm"
              variant="primary"
              onMouseEnter={preloadDialog}
              onFocus={preloadDialog}
              onClick={() => setOpen(true)}
            >
              <Plus size={14} strokeWidth={3} />
              <span className="text-[12px] font-bold tracking-tight">Создать отправку</span>
            </Button>
          )}
        </div>
      </div>

      {!flightId && <ShipmentCreateDialog open={open} onOpenChange={setOpen} />}
    </>
  );
}
