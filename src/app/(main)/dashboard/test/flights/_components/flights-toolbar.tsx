"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { ListFilter, Plus, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

const loadFlightsDialog = () => import("../../_components/create-flight-dialog").then((m) => m.FlightsDialog);
const FlightsDialog = dynamic(loadFlightsDialog, { ssr: false });

interface FlightsToolbarProps {
  canCreate: boolean;
}

export function FlightsToolbar({ canCreate }: FlightsToolbarProps) {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const handleMouseEnter = () => {
    loadFlightsDialog();
    setIsLoaded(true);
  };

  return (
    <>
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
          <Button onClick={() => {}} variant="action" size="icon-sm" title="Сбросить фильтры">
            <RotateCcw size={13} strokeWidth={2.5} />
          </Button>

          {canCreate && (
            <Button
              size="sm"
              variant="primary"
              onMouseEnter={handleMouseEnter}
              onClick={() => {
                setIsLoaded(true);
                setOpen(true);
              }}
            >
              <Plus size={14} strokeWidth={3} />
              <span className="text-[12px] font-bold tracking-tight">Создать рейс</span>
            </Button>
          )}
        </div>
      </div>

      {isLoaded && <FlightsDialog open={open} onOpenChangeAction={setOpen} />}
    </>
  );
}
