"use client";

import { Controller, useFormContext } from "react-hook-form";

import { CompanyTypeSelect } from "@/entities/company";
import type { CreateCompanySchema } from "@/entities/company/model/create-company.schema";
import type { CountryCode } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

export function CreateCompanyForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateCompanySchema>();

  return (
    <div className="space-y-4">
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <CompanyTypeSelect value={field.value} onChange={field.onChange} error={!!errors.type} />
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <CountryCityPopoverSelect
            mode="country-city"
            value={{
              country: field.value.country as CountryCode,
              city: field.value.city,
            }}
            onChangeAction={({ country, city }) => {
              field.onChange({ country, city: city ?? "" });
            }}
            className={cn(
              "font-normal",
              (errors.location?.country || errors.location?.city) && "border-destructive ring-destructive/20",
            )}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <FloatingLabelInput
            label="Название фирмы"
            mode="letters"
            {...field}
            className={cn(errors.name && "border-destructive focus-visible:ring-destructive/20")}
          />
        )}
      />
    </div>
  );
}
