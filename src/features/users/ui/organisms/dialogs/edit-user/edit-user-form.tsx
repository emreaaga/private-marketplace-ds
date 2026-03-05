"use client";

import { useState } from "react";

import { Check, Copy, RefreshCw } from "lucide-react";
import { Controller, useWatch, type UseFormReturn } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import type { UserDetail } from "@/shared/types/users";
import { Button } from "@/shared/ui/atoms/button";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { PhoneNumberInput } from "@/shared/ui/atoms/phone-number-input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import { CompanyReadonlySelect } from "./company-readonly-select";
import type { EditUserFormValues } from "./edit-user.types";
import { UserRoleSelect } from "./user-role-select";

const generateStrongPassword = (length = 12) => {
  const charset = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%^&*";
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => charset[x % charset.length])
    .join("");
};

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
  const { dirtyFields } = formState;

  const [isCopied, setIsCopied] = useState(false);

  const country = useWatch({ control, name: "location.country" });
  const phoneNumber = useWatch({ control, name: "phone_number" });
  const passwordValue = useWatch({ control, name: "password" });

  const getDirtyClass = (isDirty: boolean | undefined) =>
    isDirty
      ? "border-orange-400/60 focus-visible:ring-orange-400/30 bg-orange-50/30 dark:bg-orange-950/10 transition-all duration-300"
      : "transition-all duration-300";

  const handleGenerate = () => {
    const newPass = generateStrongPassword();
    setValue("password", newPass, { shouldDirty: true });
    clearErrors("password");
  };

  const handleCopy = () => {
    if (!passwordValue) return;
    navigator.clipboard.writeText(passwordValue);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmitAction)}>
      <div className="grid grid-cols-2 gap-3">
        <CompanyReadonlySelect companyName={user.company_name} companyType={user.company_type} />
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <div className={cn("rounded-md", getDirtyClass(dirtyFields.role))}>
              <UserRoleSelect value={field.value} onChangeAction={field.onChange} />
            </div>
          )}
        />
      </div>

      <Controller
        control={control}
        name="location"
        render={({ field }) => (
          <div className={cn("rounded-md", getDirtyClass(dirtyFields.location?.country))}>
            <CountryCityPopoverSelect
              mode="country-city-district"
              value={field.value}
              onChange={(v) => {
                field.onChange(v);

                const code = v.country ? COUNTRY_META[v.country as CountryCode]?.phoneCode : "";
                setValue("phone_code", code, { shouldDirty: true });

                if (!v.country) setValue("phone_number", "");
              }}
              placeholder="Страна · Город · Район"
            />
          </div>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FloatingLabelInput
          label="Имя"
          mode="letters"
          {...register("name")}
          className={getDirtyClass(dirtyFields.name)}
        />
        <FloatingLabelInput
          label="Фамилия"
          mode="letters"
          {...register("surname")}
          className={getDirtyClass(dirtyFields.surname)}
        />
      </div>

      <FloatingLabelInput
        label="Email"
        type="email"
        {...register("email")}
        className={getDirtyClass(dirtyFields.email)}
      />

      <div className="group/pass relative">
        <FloatingLabelInput
          label="Новый пароль"
          type="text"
          {...register("password")}
          className={cn("pr-20 font-mono text-sm", getDirtyClass(dirtyFields.password))}
          autoComplete="new-password"
        />
        <div className="bg-background absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-1 pl-2">
          {passwordValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-7 w-7"
              onClick={handleCopy}
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary h-7 w-7 transition-transform active:rotate-180"
            onClick={handleGenerate}
            title="Сгенерировать пароль"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className={cn("overflow-hidden rounded-md", getDirtyClass(dirtyFields.phone_number))}>
        <PhoneNumberInput
          country={country as CountryCode}
          value={phoneNumber}
          error={!!formState.errors.phone_number}
          onChange={(v) => {
            setValue("phone_number", v, { shouldDirty: true });
            clearErrors("phone_number");
          }}
        />
      </div>

      <FloatingLabelInput
        label="Адрес"
        {...register("address_line")}
        className={getDirtyClass(dirtyFields.address_line)}
      />
    </form>
  );
}
