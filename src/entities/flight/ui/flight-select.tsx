"use client";

import { Plane } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { FlightResponse } from "../api/types/lookup-flight.res";
import { useFlightsLookup } from "../queries/use-lookup-flight";

interface FlightSelectProps {
  value: string | number | null | undefined;
  onChange: (id: number) => void;
}

export function FlightSelect({ value, onChange }: FlightSelectProps) {
  const { data: flights, isLoading } = useFlightsLookup();

  const currentId = value !== null && value !== undefined && value !== "" ? Number(value) : null;
  const displayFlights: FlightResponse[] = flights ? [...flights] : [];

  if (currentId && !displayFlights.some((f) => f.id === currentId)) {
    displayFlights.unshift({
      id: currentId,
      arrival_at: new Date().toISOString(),
    });
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="group relative">
      <span className="bg-background text-muted-foreground/60 group-focus-within:text-primary absolute -top-2 left-2 z-10 px-1 text-xs transition-all">
        Рейс
      </span>

      <Select
        value={currentId ? String(currentId) : ""}
        onValueChange={(val) => {
          if (val) onChange(Number(val));
        }}
        disabled={isLoading}
      >
        <SelectTrigger className="focus:ring-primary/20 h-9 w-full border text-xs shadow-none focus:ring-1">
          <div className="flex items-center gap-2 truncate font-normal">
            <Plane size={12} className="text-muted-foreground/60 shrink-0" />
            <SelectValue placeholder={isLoading ? "Загрузка..." : "Выберите рейс"}>
              {currentId ? `Рейс #${currentId}` : null}
            </SelectValue>
          </div>
        </SelectTrigger>

        <SelectContent>
          {displayFlights.length === 0 && !isLoading ? (
            <div className="text-muted-foreground p-1 text-center text-xs italic">Нет доступных рейсов</div>
          ) : (
            displayFlights.map((f) => (
              <SelectItem key={f.id} value={f.id.toString()} className="py-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold">#{f.id}</span>
                  <span className="text-muted-foreground/40 text-[9px]">|</span>
                  <span className="text-muted-foreground">Прилет: {formatDate(f.arrival_at)}</span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
