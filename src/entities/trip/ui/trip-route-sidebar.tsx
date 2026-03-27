"use client";

import { useMemo } from "react";

import { CheckCircle2, ChevronRight } from "lucide-react";

import { COUNTRY_META } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";

interface Stop {
  id: string;
  code: string;
  status: string;
  orders_count: number;
}

interface TripRouteSidebarProps {
  stops: Stop[];
  selectedStopId: string;
  onSelect: (id: string) => void;
}

export function TripRouteSidebar({ stops, selectedStopId, onSelect }: TripRouteSidebarProps) {
  const cityLookup = useMemo(() => {
    const lookup: Record<string, { code: string; label: string }> = {};

    Object.values(COUNTRY_META).forEach((country) => {
      Object.values(country.cities).forEach((city) => {
        lookup[city.code.toLowerCase()] = city;
      });
    });

    return lookup;
  }, []);

  return (
    <div className="relative w-full max-w-70 space-y-1">
      <div className="bg-border/60 absolute top-4 bottom-4 left-6.5 w-px" />

      {stops.map((stop) => {
        const isActive = selectedStopId === stop.id;
        const isDelivered = stop.status === "delivered";

        const cityMeta = cityLookup[stop.code.toLowerCase()] || {
          label: stop.code.toUpperCase(),
          code: stop.code,
        };

        return (
          <button
            key={stop.id}
            onClick={() => onSelect(stop.id)}
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
              {cityMeta.code}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between gap-1">
                <span
                  className={cn(
                    "truncate text-[13px] leading-none font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {cityMeta.label}
                </span>
                {isDelivered && <CheckCircle2 size={12} className="shrink-0 text-green-600/80" />}
              </div>
              <p className="text-muted-foreground/60 mt-1.5 text-[10px] leading-none font-medium tracking-tight">
                {stop.orders_count} заказов
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
