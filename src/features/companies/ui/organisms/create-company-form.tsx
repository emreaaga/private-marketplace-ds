"use client";

import { cn } from "@/shared/lib/utils";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { CompanyType } from "@/shared/types/company/company.types";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import type { CreateCompanyForm as CreateCompanyFormType } from "./use-create-company-form";

type Props = {
  form: CreateCompanyFormType;
  setFormAction: (form: CreateCompanyFormType) => void;
  errors: Partial<Record<keyof CreateCompanyFormType, true>>;
  clearErrorAction: (field: keyof CreateCompanyFormType) => void;
};

export function CreateCompanyForm({ form, setFormAction, errors, clearErrorAction }: Props) {
  return (
    <div className="space-y-4">
      <Select
        value={form.type}
        onValueChange={(v) => {
          setFormAction({ ...form, type: v as CompanyType });
          clearErrorAction("type");
        }}
      >
        <SelectTrigger
          className={cn(
            "h-10 w-full px-3 text-sm font-normal shadow-sm transition-all",
            "bg-background border-input hover:bg-accent/50",
            errors.type && "border-destructive focus:ring-destructive/20",
          )}
        >
          <SelectValue placeholder="Тип фирмы" />
        </SelectTrigger>

        <SelectContent className="border-muted/40 rounded-xl shadow-xl">
          {Object.entries(COMPANY_TYPE_META).map(([type, meta]) => {
            const Icon = meta.Icon;
            return (
              <SelectItem key={type} value={type} className="focus:bg-accent rounded-lg py-2">
                <div className="flex items-center gap-2.5">
                  <Icon className="text-muted-foreground/70 h-3.5 w-3.5" />
                  <span className="text-sm">{meta.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <CountryCityPopoverSelect
        mode="country-city"
        value={{
          country: form.country as CountryCode,
          city: form.city,
        }}
        onChange={({ country, city }) => {
          setFormAction({ ...form, country: country as CountryCode, city: city ?? "" });
          clearErrorAction("country");
          clearErrorAction("city");
        }}
        className={cn("font-normal", (errors.country || errors.city) && "border-destructive ring-destructive/20")}
      />

      <FloatingLabelInput
        label="Название фирмы"
        value={form.name}
        onChange={(e) => {
          setFormAction({ ...form, name: e.target.value });
          clearErrorAction("name");
        }}
        className={cn(errors.name && "border-destructive focus-visible:ring-destructive/20")}
      />
    </div>
  );
}
