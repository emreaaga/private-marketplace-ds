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
  onSubmitAction,
}: {
  form: UseFormReturn<EditUserFormValues>;
  user: UserDetail;
  onSubmitAction: (values: EditUserFormValues) => void | Promise<void>;
}) {
  const { register, handleSubmit, control, formState, clearErrors, setValue } = form;

  const country = useWatch({ control, name: "location.country" });
  const phoneNumber = useWatch({ control, name: "phone_number" });
  const role = useWatch({ control, name: "role" });
  console.log("role from form:", role);

  return (
    <form id="edit-user-form" className="grid gap-4" onSubmit={handleSubmit(onSubmitAction)}>
      <div className="grid grid-cols-2 gap-3">
        <CompanyReadonlySelect companyName={user.company_name} companyType={user.company_type} />

        <Controller
          control={control}
          name="role"
          render={({ field }) => <UserRoleSelect value={field.value} onChangeAction={field.onChange} />}
        />
      </div>

      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <CountryCityPopoverSelect
            mode="country-city-district"
            value={field.value}
            onChange={(v) => {
              field.onChange(v);
              if (!v.country) setValue("phone_number", "");
            }}
            placeholder="Страна · Город · Район"
          />
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FloatingLabelInput label="Имя" {...register("name")} />
        <FloatingLabelInput label="Фамилия" {...register("surname")} />
      </div>

      <FloatingLabelInput label="Email" type="email" {...register("email")} />

      <PhoneNumberInput
        country={country}
        value={phoneNumber}
        error={!!formState.errors.phone_number}
        onChange={(v) => {
          setValue("phone_number", v, { shouldDirty: true });
          clearErrors("phone_number");
        }}
      />

      <FloatingLabelInput label="Адрес" {...register("address_line")} />
    </form>
  );
}
