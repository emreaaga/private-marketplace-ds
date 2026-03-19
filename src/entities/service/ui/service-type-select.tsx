"use client";

import { SERVICE_TYPE_META } from "@/entities/service/model/services.types.meta";
import { cn } from "@/shared/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const DISABLED_TYPES = ["delivery", "marketing"];

export function ServiceTypeSelect({ value, onChange, disabled, className }: Props) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className={cn("w-full transition-colors", className)}>
        <SelectValue placeholder="Тип услуги" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SERVICE_TYPE_META).map(([key, { label, Icon }]) => (
          <SelectItem key={key} value={key} disabled={DISABLED_TYPES.includes(key)}>
            <div className="flex items-center gap-2">
              <Icon className={cn("h-4 w-4", DISABLED_TYPES.includes(key) && "opacity-50")} />
              <span>{label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
