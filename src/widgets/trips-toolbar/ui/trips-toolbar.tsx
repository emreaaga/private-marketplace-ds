"use client";

import { useState } from "react";

import { ListFilter, Plus, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

export function TripsToolbar() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="flex w-full items-center justify-between gap-4 py-1">
      <div className="flex max-w-2xl flex-1 items-center gap-2">
        <div className="group relative flex flex-1 items-center">
          <Search className="text-muted-foreground/40 group-focus-within:text-primary/70 absolute left-2.5 h-3.5 w-3.5 transition-colors" />
          <input
            placeholder="Поиск рейса..."
            className="border-border/40 bg-background/50 placeholder:text-muted-foreground/40 focus:border-border/80 focus:bg-background focus:ring-primary/5 hover:border-border/60 h-8 w-full rounded-md border pr-3 pl-8 text-[13px] shadow-sm transition-all focus:ring-1 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5">
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
        <Button variant="action" size="icon-sm" title="Сбросить фильтры">
          <RotateCcw size={13} strokeWidth={2.5} />
        </Button>

        <Button size="sm" variant="primary" onClick={() => setIsCreateOpen(true)}>
          <Plus size={14} strokeWidth={3} />
          <span className="text-[12px] font-bold tracking-tight">Создать маршрут</span>
        </Button>
      </div>

      {/* <TripCreateDialog open={isCreateOpen} onOpenChangeAction={setIsCreateOpen} />*/}
    </div>
  );
}
