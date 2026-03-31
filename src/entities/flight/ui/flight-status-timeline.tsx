"use client";

import { Boxes, Check, LucideIcon, MapPin, Package, Plane, ShieldCheck, Truck } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type StageStatus = "completed" | "active" | "pending";

interface LifecycleStage {
  id: string;
  label: string;
  icon: LucideIcon;
  value?: string | number;
  unit?: string;
}

const STAGES: LifecycleStage[] = [
  { id: "warehouse_origin", label: "Склад", icon: Package, value: 128, unit: "шт" },
  { id: "customs_export", label: "Экспорт", icon: ShieldCheck, value: "OK", unit: "" },
  { id: "flight", label: "Рейс", icon: Plane, value: 2.22, unit: "$/кг" },
  { id: "customs_import", label: "Импорт", icon: ShieldCheck, value: 1540, unit: "кг" },
  { id: "warehouse_dest", label: "Сортировка", icon: Boxes, value: "Принято", unit: "" },
  { id: "trip_main", label: "Перевозка", icon: Truck, value: "В пути", unit: "" },
  { id: "trip_stops", label: "Филиалы", icon: MapPin, value: "1/4", unit: "г." },
  { id: "delivered", label: "Финиш", icon: Check, value: "Готово", unit: "" },
];

function LifecycleStep({ stage, status, isLast }: { stage: LifecycleStage; status: StageStatus; isLast: boolean }) {
  const Icon = stage.icon;

  return (
    <div className={cn("flex items-center", !isLast && "flex-1")}>
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(
            "group relative flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-500",
            status === "completed" && "border-zinc-200 bg-zinc-100 text-zinc-500",
            status === "active" && "border-zinc-800 bg-white text-zinc-800 shadow-sm ring-4 ring-zinc-50",
            status === "pending" && "border-zinc-100 bg-transparent text-zinc-300",
          )}
        >
          <Icon size={14} strokeWidth={status === "active" ? 2.5 : 2} />
          <span className="text-[10px] font-bold tracking-tight uppercase">{stage.label}</span>
        </div>

        <div className="flex min-h-5 flex-col items-center">
          <div className="flex items-baseline gap-0.5">
            <span
              className={cn(
                "font-mono text-[10px] font-bold tracking-tighter",
                status === "pending" ? "text-zinc-200" : "text-zinc-500",
                status === "active" && "text-zinc-800",
              )}
            >
              {stage.value ?? "—"}
            </span>
            {stage.unit && (
              <span
                className={cn(
                  "text-[8px] font-medium lowercase",
                  status === "active" ? "text-zinc-500" : "text-zinc-300",
                )}
              >
                {stage.unit}
              </span>
            )}
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="mx-1 h-0.5 min-w-3.75 flex-1 -translate-y-3.5 bg-zinc-100">
          <div
            className={cn("h-full transition-all duration-700", status === "completed" ? "w-full bg-zinc-300" : "w-0")}
          />
        </div>
      )}
    </div>
  );
}

export function FlightAndTripTimeline({ currentStatusId }: { currentStatusId: string }) {
  const currentIndex = STAGES.findIndex((s) => s.id === currentStatusId);

  return (
    <div className="scrollbar-hide mb-6 overflow-x-auto rounded-2xl border border-zinc-100 bg-white p-5">
      <div className="flex min-w-187.5 items-start justify-between px-2 text-zinc-900">
        {STAGES.map((stage, index) => {
          let status: StageStatus = "pending";
          if (index < currentIndex) status = "completed";
          else if (index === currentIndex) status = "active";

          return <LifecycleStep key={stage.id} stage={stage} status={status} isLast={index === STAGES.length - 1} />;
        })}
      </div>
    </div>
  );
}
