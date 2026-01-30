"use client";

import { useMemo } from "react";

import { FLIGHT_STATUS_META } from "@/shared/types/flight/flight.status.meta";
import { Badge } from "@/shared/ui/atoms/badge";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { EditFlightForm } from "./edit-flight-form";
import { EditFlightShipments } from "./edit-flight-shipments";
import { useFlightDetails } from "./use-flight-details";

type EditFlightDialogProps = {
  open: boolean;
  flightId: number | null;
  onOpenChangeAction: (open: boolean) => void;
};

export function EditFlightDialog({ open, flightId, onOpenChangeAction }: EditFlightDialogProps) {
  const { loading, flight } = useFlightDetails(open, flightId);

  const title = useMemo(() => (flightId == null ? "Рейс" : `Рейс #${flightId}`), [flightId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent
        className={[
          "w-[1500px]! max-w-[calc(100vw-2rem)]!",
          "h-[550]! max-h-[calc(100vh-2rem)]!",
          "flex flex-col overflow-hidden p-0",
        ].join(" ")}
      >
        <DialogHeader className="border-b px-4 py-4">
          <div className="flex items-center gap-2">
            <DialogTitle className="leading-none">{title}</DialogTitle>

            {flight &&
              (() => {
                const meta = FLIGHT_STATUS_META[flight.status];
                const Icon = meta.Icon;

                return (
                  <Badge variant="secondary" className="gap-1">
                    <Icon className="h-4 w-4 opacity-70" />
                    {meta.label}
                  </Badge>
                );
              })()}
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1">
          {loading && <div className="text-muted-foreground px-6 py-4 text-sm">Загрузка...</div>}

          {!loading && !flight && <div className="text-muted-foreground px-6 py-4 text-sm">Нет данных</div>}

          {!loading && flight && (
            <div className="grid h-full min-h-0 grid-cols-[1fr_520px]">
              <div className="min-w-0 overflow-auto px-6 py-5">
                <EditFlightForm flight={flight} />
              </div>

              <div className="bg-muted/20 min-w-0 overflow-auto border-l px-6 py-5">
                <EditFlightShipments shipments={flight.shipments} />
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t px-6 py-3">
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => onOpenChangeAction(false)}>
              Закрыть
            </Button>
            <Button disabled title="Пока без PUT">
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
