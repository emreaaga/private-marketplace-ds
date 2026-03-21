import { Controller, useFormContext } from "react-hook-form";

import { CompanySelect } from "@/entities/company";
import { ServicePricingSelect, ServiceTypeSelect } from "@/entities/service";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";

export function CreateServiceForm({ disabled }: { disabled?: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Controller
        name="company_id"
        control={control}
        render={({ field }) => (
          <CompanySelect value={field.value} error={!!errors.company_id} onChange={field.onChange} />
        )}
      />

      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <ServiceTypeSelect
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
            className={errors.type ? "border-destructive" : ""}
          />
        )}
      />

      <ServicePricingSelect disabled={disabled} />

      <Controller
        name="price"
        control={control}
        render={({ field }) => <FloatingLabelInput label="Цена" mode="decimal" disabled={disabled} {...field} />}
      />
    </div>
  );
}
