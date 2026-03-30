"use client";

import { Plus } from "lucide-react";

import { FlightCityDistribution } from "@/entities/flight";
import { cn } from "@/shared/lib/utils";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

import { StopRow } from "./stop-row";

interface Stop {
  id: string;
  code: string;
}

interface TripRouteListProps {
  stops: Stop[];
  availableCities?: FlightCityDistribution[];
  onAddStop: () => void;
  onRemoveStop: (id: string) => void;
  onUpdateStop: (id: string, code: string) => void;
}

export function TripRouteList({
  stops,
  availableCities = [],
  onAddStop,
  onRemoveStop,
  onUpdateStop,
}: TripRouteListProps) {
  const selectedCodes = stops.map((s) => s.code.toUpperCase()).filter(Boolean);
  const isLimitReached = stops.length >= availableCities.length;

  return (
    <div className="border-border/40 bg-background overflow-hidden rounded-xl border">
      <div className="border-border/30 flex items-center justify-between border-b px-3.5 py-2.5">
        <span className="text-muted-foreground/70 font-sans text-[10px] font-medium tracking-widest uppercase">
          Маршрут выгрузки
        </span>
        <button
          type="button"
          onClick={onAddStop}
          disabled={availableCities.length === 0 || isLimitReached}
          className={cn(
            "text-muted-foreground/60 flex items-center gap-1 rounded px-1.5 py-0.5 font-sans text-[11px]",
            "hover:bg-muted/60 hover:text-foreground transition-colors duration-100",
            "disabled:cursor-not-allowed disabled:opacity-30",
          )}
        >
          <Plus size={11} strokeWidth={1.5} />
          Добавить
        </button>
      </div>

      <ScrollArea className={cn(stops.length > 4 ? "h-48" : "h-auto")}>
        <div className="py-1.5">
          {stops.map((stop, index) => {
            const isLast = index === stops.length - 1 && index !== 0;
            const isActive = stop.code !== "";

            return (
              <StopRow
                key={stop.id}
                stop={stop}
                index={index}
                isLast={isLast}
                isActive={isActive}
                showLine={index < stops.length - 1}
                canRemove={index > 0}
                availableCities={availableCities}
                selectedCodes={selectedCodes}
                onRemove={() => onRemoveStop(stop.id)}
                onUpdate={(code) => onUpdateStop(stop.id, code)}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
