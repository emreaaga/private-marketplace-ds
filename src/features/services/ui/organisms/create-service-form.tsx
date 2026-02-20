"use client";

import { DollarSign } from "lucide-react";

import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import { cn } from "@/shared/lib/utils";
import type { ServicePrice } from "@/shared/types/services/services.pricing";
import { SERVICE_PRICING_META } from "@/shared/types/services/services.pricing.meta";
import type { ServiceType } from "@/shared/types/services/services.types";
import { SERVICE_TYPE_META } from "@/shared/types/services/services.types.meta";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

import type { CreateServiceForm as FormType } from "./use-create-service-form";

type Props = {
  form: FormType;
  setForm: (form: FormType) => void;
  errors: Partial<Record<keyof FormType, true>>;
  clearError: (field: keyof FormType) => void;
  disabled?: boolean;
};

export function CreateServiceForm({ form, setForm, errors, clearError, disabled }: Props) {
  return (
    <div className="space-y-3">
      <CompanySelect
        value={form.company_id}
        error={!!errors.company_id}
        onChange={(company_id) => {
          setForm({ ...form, company_id });
          clearError("company_id");
        }}
      />

      <Select
        value={form.type}
        disabled={disabled}
        onValueChange={(value) => {
          setForm({ ...form, type: value as ServiceType });
          clearError("type");
        }}
      >
        <SelectTrigger className={cn("w-full", errors.type && "border-destructive")}>
          <SelectValue placeholder="Тип услуги" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SERVICE_TYPE_META).map(([key, { label, Icon }]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                <Icon className="text-muted-foreground h-4 w-4" />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={form.pricing_type}
        disabled={disabled}
        onValueChange={(value) => {
          setForm({ ...form, pricing_type: value as ServicePrice });
          clearError("pricing_type");
        }}
      >
        <SelectTrigger className={cn("w-full", errors.pricing_type && "border-destructive")}>
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

      <FloatingLabelInput
        label="Цена"
        type="number"
        step="0.01"
        icon={DollarSign}
        disabled={disabled}
        value={form.price}
        onChange={(e) => {
          setForm({ ...form, price: e.target.value });
          clearError("price");
        }}
        className={cn(errors.price && "border-destructive")}
      />
    </div>
  );
}
