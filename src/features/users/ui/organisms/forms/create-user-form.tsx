"use client";

import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";
import { cn } from "@/shared/lib/utils";
import { USER_ROLE_META } from "@/shared/types/users/user.meta";
import type { UserRoles } from "@/shared/types/users/user.model";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

import { CompanySelect } from "../company-select";
import { LocationFields } from "../location-fields";

export interface CreateUserFormProps {
  form: ReturnType<typeof useCreateUserForm>;
}

export function CreateUserForm({ form }: CreateUserFormProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <CompanySelect
          value={form.companyId}
          onChange={(v) => {
            form.setCompanyId(v);
            form.clearError("company_id");
          }}
          error={!!form.errors.company_id}
        />

        <Select
          value={form.role}
          onValueChange={(v) => {
            form.setRole(v as UserRoles);
            form.clearError("role");
          }}
        >
          <SelectTrigger className={cn("w-full", form.errors.role && "border-destructive focus:ring-destructive")}>
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

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Input
          placeholder="Имя"
          value={form.name}
          onChange={(e) => {
            form.setName(e.target.value);
            form.clearError("name");
          }}
          className={cn(form.errors.name && "border-destructive focus-visible:ring-destructive")}
        />

        <Input
          placeholder="Фамилия"
          value={form.surname}
          onChange={(e) => {
            form.setSurname(e.target.value);
            form.clearError("surname");
          }}
          className={cn(form.errors.surname && "border-destructive focus-visible:ring-destructive")}
        />
      </div>

      <LocationFields
        country={form.country}
        city={form.city}
        district={form.district}
        addressLine={form.addressLine}
        phoneNumber={form.phoneNumber}
        phoneCode={form.phoneCode}
        countryOptions={form.countryOptions}
        cityOptions={form.cityOptions}
        districtOptions={form.districtOptions}
        onCountryChange={form.handleCountryChange}
        onCityChange={form.handleCityChange}
        onDistrictChange={form.setDistrict}
        onAddressLineChange={form.setAddressLine}
        onPhoneNumberChange={form.setPhoneNumber}
        errors={form.errors}
        clearError={form.clearError}
      />
    </div>
  );
}
