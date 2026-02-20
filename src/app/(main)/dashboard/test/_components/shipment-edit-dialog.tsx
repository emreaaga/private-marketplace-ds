"use client";

import { Building2, Calendar, LinkIcon, AlertCircle, Package, Globe } from "lucide-react";

import { useShipmentDetails } from "@/features/shipments/queries/use-flight-details";
import { SHIPMENT_STATUS_META } from "@/shared/types/shipment/shipment.status.meta";
import { Badge } from "@/shared/ui/atoms/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Separator } from "@/shared/ui/atoms/separator";

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
      <DialogContent className="gap-0 overflow-hidden border-none p-0 shadow-2xl sm:max-w-[400px]">
        {/* Шапка */}
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-zinc-50 dark:bg-zinc-900">
              <Package className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="space-y-0.5">
              <DialogTitle className="text-base font-bold tracking-tight">Отправка</DialogTitle>
              <p className="font-mono text-xs text-zinc-500">#{shipmentId}</p>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="relative min-h-[260px]">
          {isLoading && !displayData ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-500" />
            </div>
          ) : displayData ? (
            <div className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{displayData.route}</span>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-md border-zinc-200 font-bold text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                >
                  {SHIPMENT_STATUS_META[displayData.status].label || displayData.status}
                </Badge>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="rounded-md bg-white p-1.5 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
                  {displayData.flight_id ? (
                    <LinkIcon className="h-3.5 w-3.5 text-zinc-500" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-zinc-400" />
                  )}
                </div>
                <span
                  className={`text-xs font-bold ${displayData.flight_id ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400"}`}
                >
                  {displayData.flight_id ? `Рейс #${displayData.flight_id}` : "Рейс не назначен"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5">
                  <Building2 className="h-4 w-4 text-zinc-400" />
                  <span className="truncate text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {displayData.company_name || "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-zinc-400" />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {new Date(displayData.created_at).toLocaleDateString("ru-RU")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[260px] flex-col items-center justify-center text-center">
              <AlertCircle className="h-6 w-6 text-zinc-200" />
              <p className="mt-2 text-xs font-medium text-zinc-400">Нет данных</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
