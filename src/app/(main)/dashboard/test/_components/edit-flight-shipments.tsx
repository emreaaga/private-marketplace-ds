"use client";

import type { FlightShipment } from "@/shared/types/flight/flight.dto";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";

function num2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "0.00";
}

type EditFlightShipmentsProps = {
  shipments: FlightShipment[];
};

export function EditFlightShipments({ shipments }: EditFlightShipmentsProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium">Отправки</div>
        <div className="text-muted-foreground text-xs">{shipments.length} шт</div>
      </div>

      <div className="min-h-0 flex-1">
        <ScrollArea className="bg-background h-full rounded-md border">
          {shipments.length === 0 ? (
            <div className="text-muted-foreground px-4 py-4 text-sm">Нет отправок</div>
          ) : (
            <div className="divide-y">
              {shipments.map((s) => (
                <div key={s.id} className="px-4 py-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-muted-foreground text-sm">
                      #{s.id} · {s.company_name}
                    </div>

                    <div className="text-muted-foreground text-xs whitespace-nowrap">
                      {num2(s.total_weight_kg)} кг · {Number(s.orders_count)} шт
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
