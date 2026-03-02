"use client";

import { AlertCircle, Building2, Calendar, Globe, LinkIcon, Package } from "lucide-react";

import { useShipmentDetails } from "@/features/shipments/queries/use-flight-details";
import { cn } from "@/shared/lib/utils";
import { SHIPMENT_STATUS_META } from "@/shared/types/shipment/shipment.status.meta";
import { Badge } from "@/shared/ui/atoms/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

interface ShipmentDetailDialogProps {
  open: boolean;
  shipmentId: number | null;
  onOpenChangeAction: (open: boolean) => void;
}

export function ShipmentDetailDialog({ open, shipmentId, onOpenChangeAction }: ShipmentDetailDialogProps) {
  const { data: shipment, isLoading } = useShipmentDetails(shipmentId, open);
  const displayData = shipment;

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="border-border/40 bg-background overflow-hidden rounded-2xl p-0 shadow-2xl sm:max-w-95">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-4">
            <div className="border-border/50 bg-muted/30 text-muted-foreground/70 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border">
              <Package size={22} strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-[17px] font-bold tracking-tight">Детали отправки</DialogTitle>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground/50 font-mono text-[11px] font-medium tracking-wider uppercase">
                  ID: {shipmentId}
                </span>
                {displayData && (
                  <Badge
                    variant="outline"
                    className="border-border/60 text-muted-foreground h-5 rounded-md px-1.5 text-[10px] font-bold"
                  >
                    {SHIPMENT_STATUS_META[displayData.status]?.label || displayData.status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="relative min-h-65 px-6 py-4">
          {isLoading ? (
            <div className="bg-background/50 absolute inset-0 flex items-center justify-center backdrop-blur-[2px]">
              <div className="border-primary/20 border-t-primary/80 h-5 w-5 animate-spin rounded-full border-2" />
            </div>
          ) : displayData ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 py-1">
                <div className="bg-primary/5 text-primary/70 flex h-8 w-8 items-center justify-center rounded-full">
                  <Globe size={16} />
                </div>
                <span className="text-foreground/90 text-[15px] font-bold tracking-tight">{displayData.route}</span>
              </div>

              <div className="grid gap-3">
                <div
                  className={cn(
                    "border-border/40 flex items-center gap-3 rounded-xl border p-3 transition-colors",
                    displayData.flight_id ? "bg-muted/30" : "border-orange-200/50 bg-orange-50/30",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg border shadow-sm transition-colors",
                      displayData.flight_id
                        ? "bg-background border-border/60 text-primary/60"
                        : "bg-background border-orange-200 text-orange-400",
                    )}
                  >
                    {displayData.flight_id ? <LinkIcon size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground/50 text-[10px] font-bold tracking-widest uppercase">
                      Статус рейса
                    </span>
                    <span
                      className={cn(
                        "text-[13px] font-bold",
                        displayData.flight_id ? "text-foreground/80" : "text-orange-500/80",
                      )}
                    >
                      {displayData.flight_id ? `Рейс #${displayData.flight_id}` : "Не назначен"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex flex-col gap-1 px-1">
                    <div className="text-muted-foreground/40 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
                      <Building2 size={12} /> Компания
                    </div>
                    <span className="text-foreground/70 truncate text-[13px] font-medium">
                      {displayData.company_name || "—"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <div className="text-muted-foreground/40 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
                      <Calendar size={12} /> Дата
                    </div>
                    <span className="text-foreground/70 text-[13px] font-medium">
                      {new Date(displayData.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-50 flex-col items-center justify-center text-center opacity-40">
              <AlertCircle size={32} strokeWidth={1} />
              <p className="mt-3 text-[13px] font-medium">Данные не найдены</p>
            </div>
          )}
        </div>

        <div className="border-border/40 bg-muted/5 mt-4 flex justify-end border-t px-6 py-3">
          <button
            onClick={() => onOpenChangeAction(false)}
            className="text-muted-foreground/60 hover:text-foreground text-[12px] font-bold transition-colors"
          >
            Закрыть
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
