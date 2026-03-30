"use client";

import { CheckCircle2, CircleDollarSign, Clock, Package, Pencil, Weight, X } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

interface TripDetailDialogProps {
  tripId: number | null;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

const MOCK_DETAILS = {
  id: 1,
  vehicle: "Isuzu (01 A 777 AA)",
  driver: "Begzod (+998 90 123-45-67)",
  total_weight: "1 470.45 кг",
  total_cash: "$25,400",
  status: "on_way",
  stops: [
    { city: "TAS", name: "Ташкент", orders: 15, status: "delivered", time: "10:00" },
    { city: "SKD", name: "Самарканд", orders: 20, status: "pending", time: null },
    { city: "BKH", name: "Бухара", orders: 10, status: "pending", time: null },
  ],
};

export function TripDetailDialog({ tripId, open, onOpenChangeAction }: TripDetailDialogProps) {
  if (!tripId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-105 [&>button]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
          <DialogTitle className="flex items-center gap-1.5 text-sm font-medium">
            <span className="text-muted-foreground font-normal">Манифест</span>
            <span className="text-foreground/40">/</span>
            <span>TR-{tripId}</span>
          </DialogTitle>
          <button
            onClick={() => onOpenChangeAction(false)}
            className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-md p-1 transition-colors"
          >
            <X size={14} />
          </button>
        </DialogHeader>

        <div className="divide-y">
          <div className="grid grid-cols-2 divide-x">
            <div className="flex flex-col gap-0.5 px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-1 text-[10px] font-medium tracking-wide uppercase">
                <Weight size={10} />
                Общий вес
              </div>
              <p className="text-sm font-semibold tabular-nums">{MOCK_DETAILS.total_weight}</p>
            </div>
            <div className="flex flex-col gap-0.5 px-4 py-3">
              <div className="text-muted-foreground flex items-center gap-1 text-[10px] font-medium tracking-wide uppercase">
                <CircleDollarSign size={10} />К сбору
              </div>
              <p className="text-sm font-semibold text-emerald-600 tabular-nums">{MOCK_DETAILS.total_cash}</p>
            </div>
          </div>

          <div className="px-4 py-3">
            <p className="text-muted-foreground mb-3 text-[10px] font-medium tracking-wide uppercase">Маршрут</p>
            <div className="relative ml-1 space-y-3">
              {MOCK_DETAILS.stops.map((stop, index) => (
                <div key={stop.city} className="relative flex items-center gap-3">
                  {index !== MOCK_DETAILS.stops.length - 1 && (
                    <div className="bg-border absolute top-4.5 left-1.75 h-[calc(100%+4px)] w-px" />
                  )}

                  <div
                    className={cn(
                      "bg-background relative z-10 flex h-3.75 w-3.75 shrink-0 items-center justify-center rounded-full border",
                      stop.status === "delivered"
                        ? "border-emerald-500 text-emerald-500"
                        : "border-border text-muted-foreground/40",
                    )}
                  >
                    {stop.status === "delivered" ? (
                      <CheckCircle2 size={11} strokeWidth={2.5} className="-m-px" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                  </div>

                  <div className="bg-card flex flex-1 items-center justify-between rounded-md border px-3 py-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold">{stop.city}</span>
                        <span className="text-muted-foreground text-xs">{stop.name}</span>
                      </div>
                      <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-[11px]">
                        <span className="flex items-center gap-0.5">
                          <Package size={9} />
                          {stop.orders} зак.
                        </span>
                        {stop.time && (
                          <span className="flex items-center gap-0.5 text-emerald-600">
                            <Clock size={9} />
                            {stop.time}
                          </span>
                        )}
                      </div>
                    </div>
                    {stop.status === "pending" && (
                      <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 ring-1 ring-amber-200 ring-inset">
                        В пути
                      </span>
                    )}
                    {stop.status === "delivered" && (
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 ring-1 ring-emerald-200 ring-inset">
                        Доставлено
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-muted/30 flex items-center justify-end gap-2 border-t px-4 py-2.5">
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => onOpenChangeAction(false)}>
            Закрыть
          </Button>
          <Button size="sm" className="h-7 gap-1.5 text-xs">
            <Pencil size={11} />
            Редактировать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
