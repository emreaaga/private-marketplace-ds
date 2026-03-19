"use client";

import { Controller, useFormContext } from "react-hook-form";

import { SERVICE_PRICING_META } from "@/entities/service/model/services.pricing.meta";
import { cn } from "@/shared/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

type Props = {
  disabled?: boolean;
};

export function ServicePricingSelect({ disabled }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors.pricing_type;

  return (
    <Controller
      name="pricing_type"
      control={control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange} disabled={disabled}>
          <SelectTrigger className={cn("w-full", error && "border-destructive")}>
            <SelectValue placeholder="Тариф" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SERVICE_PRICING_META).map(([key, { label, Icon }]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center gap-2">
                  <Icon className="text-muted-foreground h-4 w-4" />
                  <span>{label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
