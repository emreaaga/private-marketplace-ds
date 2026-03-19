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

      <ServiceTypeSelect disabled={disabled} />
      <ServicePricingSelect disabled={disabled} />

      <Controller
        name="price"
        control={control}
        render={({ field }) => <FloatingLabelInput label="Цена" mode="decimal" disabled={disabled} {...field} />}
      />
    </div>
  );
}
