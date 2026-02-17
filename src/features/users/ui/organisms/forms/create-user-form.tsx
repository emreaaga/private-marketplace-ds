"use client";

import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";
import { cn } from "@/shared/lib/utils";
import { CountryCode } from "@/shared/types/geography/country.types";
import { USER_ROLE_META } from "@/shared/types/users/user.meta";
import type { UserRoles } from "@/shared/types/users/user.model";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

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
          <SelectTrigger className={cn("w-full", form.errors.role && "border-destructive")}>
            <SelectValue placeholder="Роль" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(USER_ROLE_META).map(([role, meta]) => {
              const Icon = meta.Icon;
              return (
                <SelectItem key={role} value={role} disabled={meta.disabled}>
                  <div className="flex items-center gap-2">
                    <Icon className="text-muted-foreground h-4 w-4" />
                    <span>{meta.label}</span>
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
          value={form.name}
          onChange={(e) => {
            form.setName(e.target.value);
            form.clearError("name");
          }}
          className={cn(form.errors.name && "border-destructive")}
        />

        <FloatingLabelInput
          label="Фамилия"
          value={form.surname}
          onChange={(e) => {
            form.setSurname(e.target.value);
            form.clearError("surname");
          }}
          className={cn(form.errors.surname && "border-destructive")}
        />
      </div>

      <LocationFields
        location={{
          country: form.country || null,
          city: form.city || null,
          district: form.district || null,
        }}
        addressLine={form.addressLine}
        phoneNumber={form.phoneNumber}
        onLocationChange={(loc) => {
          if (loc.country && loc.country !== form.country) {
            form.handleCountryChange(loc.country);
          } else if (!loc.country && form.country !== "") {
            form.handleCountryChange("" as CountryCode);
          }

          if (loc.city !== form.city) form.handleCityChange(loc.city ?? "");
          if (loc.district !== form.district) form.setDistrict(loc.district ?? "");
        }}
        onAddressLineChange={form.setAddressLine}
        onPhoneNumberChange={form.setPhoneNumber}
        errors={form.errors}
        clearError={form.clearError}
      />
    </div>
  );
}
