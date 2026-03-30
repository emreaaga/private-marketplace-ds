"use client";

import { CheckCircle2, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { type TripStop } from "../api/get-trip-stops.api";

interface TripRouteSidebarProps {
  stops: TripStop[];
  selectedStopId: number | null;
  onSelect: (id: number) => void;
}

export function TripRouteSidebar({ stops, selectedStopId, onSelect }: TripRouteSidebarProps) {
  return (
    <div className="relative w-full max-w-70 space-y-1">
      <div className="bg-border/60 absolute top-4 bottom-4 left-6.5 w-px" />

      {stops.map((stop) => {
        const isActive = selectedStopId === stop.branch_id;
        const isDelivered = stop.status === "completed";

        const cityCode = stop.city.toUpperCase();

        return (
          <button
            key={stop.branch_id}
            onClick={() => onSelect(stop.branch_id)}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all duration-200",
              isActive ? "bg-secondary/60 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" : "hover:bg-secondary/30",
            )}
          >
            <div
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-[10px] font-black tracking-tighter uppercase transition-colors",
                isDelivered
                  ? "border-green-200 bg-green-50 text-green-700"
                  : isActive
                    ? "border-primary/20 bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-muted-foreground group-hover:border-border/80",
              )}
            >
              {cityCode}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between gap-1">
                <span
                  className={cn(
                    "truncate text-[13px] leading-none font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {cityCode}
                </span>
                {isDelivered && <CheckCircle2 size={12} className="shrink-0 text-green-600/80" />}
              </div>
              <p className="text-muted-foreground/60 mt-1.5 text-[10px] leading-none font-medium tracking-tight">
                {stop.orders_count ?? 0} заказов
              </p>
            </div>

            <ChevronRight
              size={14}
              className={cn(
                "shrink-0 transition-transform",
                isActive
                  ? "text-foreground translate-x-0.5"
                  : "text-muted-foreground/10 group-hover:text-muted-foreground/40",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
