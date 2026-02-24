"use client";

import { RefreshCw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Input } from "@/shared/ui/atoms/input";

import { distributeWeightProportionally, type EditFlightFormValues } from "./edit-flight.utils";

export function FlightWeightControl() {
  const { control, register, setValue } = useFormContext<EditFlightFormValues>();

  const calculatedStr = useWatch({ control, name: "total_flight_weight_kg" });
  const actualStr = useWatch({ control, name: "final_gross_weight_kg" });
  const shipmentsData = useWatch({ control, name: "shipments_data" });

  const calculated = parseFloat(calculatedStr ?? "0");
  const actual = parseFloat(actualStr);
  const diff = actual - calculated;

  const hasOverweight = diff > 0.01;
  const isOk = Math.abs(diff) <= 0.01 && actual > 0;

  const handleDistribute = () => {
    if (!actualStr || shipmentsData.length === 0) return;

    const updatedShipments = distributeWeightProportionally(actualStr, shipmentsData);

    setValue("shipments_data", updatedShipments, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("total_flight_weight_kg", actual.toFixed(2), { shouldDirty: true });
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-1 text-[10px] font-medium tracking-tight uppercase">
        <span className="text-muted-foreground/60">Факт. вес</span>
        <span className="text-muted-foreground/30 font-mono italic">Sys: {calculated.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Input
            {...register("final_gross_weight_kg")}
            placeholder="0.00"
            className={cn(
              "h-8 pr-7 font-mono text-sm transition-all",
              hasOverweight && "border-orange-400/60 bg-orange-50/20 text-orange-700",
              isOk && "border-green-500/40 bg-green-50/20 text-green-700",
            )}
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            {hasOverweight && <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />}
            {isOk && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
          </div>
        </div>

        {hasOverweight && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 border-orange-200 bg-orange-50 text-orange-600 shadow-sm hover:bg-orange-100"
            onClick={handleDistribute}
            title={`Распределить +${diff.toFixed(2)} кг`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {hasOverweight && (
        <div className="animate-in fade-in slide-in-from-top-1 px-1 text-[9px] font-bold text-orange-500/80">
          +{diff.toFixed(2)} kg к распределению
        </div>
      )}
    </div>
  );
}
