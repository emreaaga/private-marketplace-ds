"use client";

import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";
import { cn } from "@/shared/lib/utils";
import { CountryCode } from "@/shared/types/geography/country.types";
import { USER_ROLE_META } from "@/shared/types/users/user.meta";
import type { UserRoles } from "@/shared/types/users/user.model";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { CompanySelect } from "../company-select";
import { LocationFields } from "../location-fields";

export interface CreateUserFormProps {
  form: ReturnType<typeof useCreateUserForm>;
}

export function CreateUserForm({ form }: CreateUserFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CompanySelect
          value={form.companyId}
          onChange={(v) => {
            form.setCompanyId(v);
            form.clearError("company_id");
          }}
          error={!!form.errors.company_id}
        />

        <Select
          key={form.role}
          value={form.role}
          onValueChange={(v) => {
            form.setRole(v as UserRoles);
            form.clearError("role");
          }}
        >
          <SelectTrigger
            className={cn(
              "h-10 w-full px-3 text-sm font-normal shadow-sm transition-all",
              "bg-background border-input hover:bg-accent/50",
              form.errors.role && "border-destructive focus:ring-destructive/20",
            )}
          >
            <SelectValue placeholder="Выберите роль" />
          </SelectTrigger>

          <SelectContent className="border-muted/40 rounded-xl shadow-xl">
            {Object.entries(USER_ROLE_META).map(([role, meta]) => {
              const Icon = meta.Icon;
              return (
                <SelectItem
                  key={role}
                  value={role}
                  disabled={meta.disabled}
                  className="focus:bg-accent rounded-lg py-2"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="text-muted-foreground/70 h-3.5 w-3.5" />
                    <span className="text-sm">{meta.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FloatingLabelInput
          label="Имя"
          mode="letters"
          value={form.name}
          onChange={(e) => {
            form.setName(e.target.value);
            form.clearError("name");
          }}
          className={cn(form.errors.name && "border-destructive focus-visible:ring-destructive/20")}
        />

        <FloatingLabelInput
          label="Фамилия"
          mode="letters"
          value={form.surname}
          onChange={(e) => {
            form.setSurname(e.target.value);
            form.clearError("surname");
          }}
          className={cn(form.errors.surname && "border-destructive focus-visible:ring-destructive/20")}
        />
      </div>

      <LocationFields
        location={{
          country: (form.country as CountryCode) || null,
          city: form.city || null,
          district: form.district || null,
        }}
        addressLine={form.addressLine}
        phoneNumber={form.phoneNumber}
        onLocationChange={(loc) => {
          const newCountry = loc.country ?? "";
          const currentCountry = form.country ?? "";

          if (newCountry !== currentCountry) {
            form.handleCountryChange(newCountry as CountryCode);
          }

          if (loc.city !== form.city) {
            form.handleCityChange(loc.city ?? "");
          }

          if (loc.district !== form.district) {
            form.setDistrict(loc.district ?? "");
          }
        }}
        onAddressLineChange={form.setAddressLine}
        onPhoneNumberChange={form.setPhoneNumber}
        errors={form.errors}
        clearError={form.clearError}
      />
    </div>
  );
}
