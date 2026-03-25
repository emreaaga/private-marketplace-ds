"use client";

import { CompanyBranchPopoverSelect } from "@/entities/branch";
import { CountryCode } from "@/entities/geography";
import { type UserRoles, USER_ROLE_META } from "@/entities/user";
import { useCreateUserForm } from "@/features/user-create/ui/use-create-user-form";
import { cn } from "@/shared/lib/utils";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { LocationFields } from "./location-fields";

export interface CreateUserFormProps {
  form: ReturnType<typeof useCreateUserForm>;
}

export function CreateUserForm({ form }: CreateUserFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CompanyBranchPopoverSelect
          value={{
            companyId: form.companyId ?? null,
            branchId: form.branchId ?? null,
          }}
          onChangeAction={(val) => {
            form.setCompanyId(val.companyId ?? undefined);

            form.setBranchId(val.branchId ?? undefined);

            if (val.companyId) form.clearError("company_id");
            if (val.branchId) form.clearError("branch_id");
          }}
          className={cn(
            (form.errors.company_id || form.errors.branch_id) && "border-destructive focus-visible:ring-destructive/20",
          )}
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

      {/* Секция 2: Имя и Фамилия */}
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
          if (newCountry !== (form.country ?? "")) {
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
