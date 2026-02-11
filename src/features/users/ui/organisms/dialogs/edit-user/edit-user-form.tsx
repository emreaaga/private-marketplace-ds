"use client";

import { Controller, useWatch, type UseFormReturn } from "react-hook-form";

import type { UserDetail } from "@/shared/types/users";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import { CompanyReadonlySelect } from "./company-readonly-select";
import type { EditUserFormValues } from "./edit-user.types";
import { PhoneNumberInput } from "./phone-number-input";
import { UserRoleSelect } from "./user-role-select";

export function EditUserForm({
  form,
  user,
  onSubmit,
}: {
  form: UseFormReturn<EditUserFormValues>;
  user: UserDetail;
  onSubmit: (values: EditUserFormValues) => void | Promise<void>;
}) {
  const { register, handleSubmit, control, formState, clearErrors, setValue } = form;

  const country = useWatch({ control, name: "location.country" });
  const phoneNumber = useWatch({ control, name: "phone_number" });

  return (
    <form id="edit-user-form" className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Row 1: Company + Role */}
      <div className="grid grid-cols-2 gap-3">
        <CompanyReadonlySelect companyName={user.company_name} companyType={user.company_type} />

        <Controller
          control={control}
          name="role"
          render={({ field }) => <UserRoleSelect value={field.value} onChange={field.onChange} />}
        />
      </div>

      {/* Row 2: Country/City/District */}
      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <CountryCityPopoverSelect
            mode="country-city-district"
            value={field.value}
            onChange={(v) => {
              field.onChange(v);
              // если страну сбросили — очищаем телефон
              if (!v.country) setValue("phone_number", "");
            }}
            placeholder="Страна · Город · Район"
          />
        )}
      />

      {/* Row 3: Name + Surname */}
      <div className="grid grid-cols-2 gap-3">
        <FloatingLabelInput label="Имя" {...register("name")} />
        <FloatingLabelInput label="Фамилия" {...register("surname")} />
      </div>

      {/* Row 4: Email */}
      <FloatingLabelInput label="Email" type="email" {...register("email")} />

      {/* Row 5: Phone (depends on country) */}
      <PhoneNumberInput
        country={country}
        value={phoneNumber ?? ""}
        error={!!formState.errors.phone_number}
        onChange={(v) => {
          setValue("phone_number", v, { shouldDirty: true });
          clearErrors("phone_number");
        }}
      />

      {/* Row 6: Address */}
      <FloatingLabelInput label="Адрес" {...register("address_line")} />
    </form>
  );
}
