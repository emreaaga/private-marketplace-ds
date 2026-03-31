"use client";

import { use, useState } from "react";

import { Package } from "lucide-react";

import { FlightAndTripTimeline } from "@/entities/flight";
import { TripRouteSidebar, TripStopOrders, useTripStops } from "@/entities/trip";
import { Button } from "@/shared/ui/atoms/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TripDetailsPage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const tripId = Number(unwrappedParams.id);

  const { data: stopsResponse, isLoading, isError } = useTripStops(tripId);
  const stops = stopsResponse?.data || [];

  const [userSelectedId, setUserSelectedId] = useState<number | null>(null);

  const activeBranchId = userSelectedId;
  const selectedStop = stops.find((s) => s.branch_id === activeBranchId);

  if (isLoading) {
    return <div className="text-muted-foreground animate-pulse p-8 text-center">Загрузка маршрута...</div>;
  }

  if (isError || stops.length === 0) {
    return <div className="p-8 text-center font-medium text-red-500">Маршрут не найден или произошла ошибка</div>;
  }

  return (
    <div className="space-y-4">
      <FlightAndTripTimeline currentStatusId="warehouse_dest" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-2">
          <TripRouteSidebar stops={stops} selectedStopId={activeBranchId} onSelect={setUserSelectedId} />
        </div>

        <div className="lg:col-span-10">
          <div className="flex h-10 items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-muted-foreground/50" />
              <h3 className="text-[15px] font-semibold tracking-tight">
                Заказы:{" "}
                <span className="text-muted-foreground font-normal">
                  {selectedStop?.city?.toUpperCase() || "ВЫБЕРИТЕ ГОРОД"}
                </span>
              </h3>
            </div>

            <div className="flex items-center">
              {selectedStop?.status === "created" && activeBranchId && (
                <Button variant="ghost" size="sm">
                  Подтвердить доставку
                </Button>
              )}
            </div>
          </div>

          {activeBranchId ? (
            <TripStopOrders tripId={tripId} branchId={activeBranchId} />
          ) : (
            <div className="border-border/40 bg-secondary/10 flex h-80 flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center">
              <div className="bg-background mb-4 flex h-12 w-12 items-center justify-center rounded-full border shadow-sm">
                <Package size={20} className="text-muted-foreground/40" />
              </div>
              <p className="text-foreground text-sm font-semibold">Город не выбран</p>
              <p className="text-muted-foreground mt-1 max-w-50 text-xs">
                Выберите точку маршрута слева, чтобы увидеть список заказов для выгрузки
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
