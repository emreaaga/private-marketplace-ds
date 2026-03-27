"use client";

import { CheckCircle2, CircleDollarSign, Clock, Package, Truck, User, Weight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog"; // Используй свои компоненты диалога

interface TripDetailDialogProps {
  tripId: number | null;
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

// В будущем здесь будет fetch данных по tripId
const MOCK_DETAILS = {
  id: 1,
  vehicle: "Isuzu (01 A 777 AA)",
  driver: "Begzod (+998 90 123-45-67)",
  total_weight: "1470.45 кг",
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
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="text-muted-foreground font-normal">Манифест</span>
            TR-{tripId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Инфо-панель рейса */}
          <div className="bg-muted/20 grid grid-cols-2 gap-4 rounded-xl border p-4">
            <div className="space-y-1">
              <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-bold uppercase">
                <Truck size={12} /> Транспорт
              </div>
              <p className="text-sm font-medium">{MOCK_DETAILS.vehicle}</p>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-bold uppercase">
                <User size={12} /> Водитель
              </div>
              <p className="text-sm font-medium">{MOCK_DETAILS.driver}</p>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-bold uppercase">
                <Weight size={12} /> Общий вес
              </div>
              <p className="text-sm font-medium">{MOCK_DETAILS.total_weight}</p>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-bold uppercase">
                <CircleDollarSign size={12} /> К сбору
              </div>
              <p className="text-sm font-bold text-green-600">{MOCK_DETAILS.total_cash}</p>
            </div>
          </div>

          {/* Визуальный маршрут (Vertical Stepper) */}
          <div className="space-y-4">
            <h4 className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">Маршрут следования</h4>
            <div className="relative ml-2 space-y-6">
              {MOCK_DETAILS.stops.map((stop, index) => (
                <div key={stop.city} className="relative flex items-start gap-4">
                  {/* Линия соединения */}
                  {index !== MOCK_DETAILS.stops.length - 1 && (
                    <div className="bg-muted-foreground/10 absolute top-[26px] left-[11px] h-[calc(100%+8px)] w-[2px]" />
                  )}

                  {/* Иконка точки */}
                  <div
                    className={cn(
                      "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white",
                      stop.status === "delivered"
                        ? "border-green-500 text-green-500"
                        : "border-muted-foreground/30 text-muted-foreground/30",
                    )}
                  >
                    {stop.status === "delivered" ? (
                      <CheckCircle2 size={14} strokeWidth={3} />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </div>

                  {/* Данные остановки */}
                  <div className="bg-background flex flex-1 items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{stop.city}</span>
                        <span className="text-muted-foreground text-xs">— {stop.name}</span>
                      </div>
                      <div className="text-muted-foreground mt-1 flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1">
                          <Package size={10} /> {stop.orders} зак.
                        </span>
                        {stop.time && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Clock size={10} /> {stop.time}
                          </span>
                        )}
                      </div>
                    </div>
                    {stop.status === "pending" && (
                      <div className="rounded bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-500 uppercase">
                        В пути
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChangeAction(false)} className="w-full sm:w-auto">
            Закрыть
          </Button>
          <Button variant="primary" className="w-full px-8 sm:w-auto">
            Редактировать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
