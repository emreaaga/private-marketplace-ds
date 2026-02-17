"use client";

import { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";

import type { UpdateCompanyPayload } from "@/features/companies/api/companies";
import { useCompanyDetail } from "@/features/companies/queries/use-company-detail";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { CompanyType } from "@/shared/types/company/company.types";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";
import { Switch } from "@/shared/ui/atoms/switch";

type LocationValue = {
  country: CountryCode | null;
  city: string | null;
  district?: null;
};

type FormValues = Omit<UpdateCompanyPayload, "country" | "city"> & {
  location: LocationValue;
};

type Props = {
  open: boolean;
  companyId: number | null;
  pending?: boolean;
  onOpenChange(open: boolean): void;
  onSubmitAction?: (companyId: number, values: UpdateCompanyPayload) => void | Promise<unknown>;
};

const DEFAULT_TYPE = "platform" as CompanyType;

const EMPTY: FormValues = {
  name: "",
  type: DEFAULT_TYPE,
  location: { country: null, city: null, district: null },
  is_active: true,
};

// eslint-disable-next-line complexity
export function CompanyEditDialog({ open, companyId, pending = false, onOpenChange, onSubmitAction }: Props) {
  const isEnabled = open && companyId != null;
  const { data: company, isLoading, isError } = useCompanyDetail(companyId, isEnabled);

  const normalizedData = useMemo<FormValues>(() => {
    if (!company) return EMPTY;

    const typeKeys = Object.keys(COMPANY_TYPE_META) as CompanyType[];
    const safeCountry = company.country;
    const cityLower = company.city.toLowerCase();

    const cityExists = Object.values(COUNTRY_META[safeCountry].cities).some((c) => c.code === cityLower);

    return {
      name: company.name,
      type: typeKeys.includes(company.type) ? company.type : DEFAULT_TYPE,
      location: {
        country: safeCountry,
        city: cityExists ? cityLower : null,
        district: null,
      },
      is_active: !!company.is_active,
    };
  }, [company]);

  const form = useForm<FormValues>({
    defaultValues: EMPTY,
    values: open && company ? normalizedData : EMPTY,
    resetOptions: {
      keepDefaultValues: false,
    },
  });

  const requestClose = () => {
    if (pending || form.formState.isSubmitting) return;
    onOpenChange(false);
  };

  const submit = async (values: FormValues) => {
    if (companyId == null || !onSubmitAction) return;

    const { country, city } = values.location;
    if (!country || !city) return;

    try {
      const payload: UpdateCompanyPayload = {
        name: values.name.trim(),
        type: values.type,
        country,
        city,
        is_active: values.is_active,
      };

      await onSubmitAction(companyId, payload);
      onOpenChange(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const isSaveDisabled = pending || isLoading || !form.formState.isDirty || !form.formState.isValid;

  return (
    <Dialog open={open} onOpenChange={requestClose}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{isLoading ? "Загрузка..." : `Компания #${companyId}`}</DialogTitle>
        </DialogHeader>

        {isError && <div className="text-destructive py-4 text-center text-sm">Ошибка загрузки</div>}

        {!isError && (
          <form id="company-edit-form" className="grid gap-4 py-2" onSubmit={form.handleSubmit(submit)}>
            <FloatingLabelInput
              label="Название"
              disabled={isLoading || pending}
              {...form.register("name", { required: true, minLength: 2 })}
            />

            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <Select
                  key={field.value}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading || pending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Тип компании" />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(COMPANY_TYPE_META) as CompanyType[]).map((t) => {
                      const meta = COMPANY_TYPE_META[t];
                      return (
                        <SelectItem key={t} value={t}>
                          <div className="flex items-center gap-2">
                            <meta.Icon className="text-muted-foreground h-4 w-4" />
                            <span>{meta.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              control={form.control}
              name="location"
              rules={{ validate: (v) => !!v.country && !!v.city }}
              render={({ field, fieldState }) => (
                <div className="space-y-1">
                  <CountryCityPopoverSelect
                    mode="country-city"
                    value={field.value}
                    onChange={(v) => {
                      field.onChange(v);
                      form.clearErrors("location");
                    }}
                    placeholder="Страна · Город"
                  />
                  {fieldState.error && <span className="text-destructive text-xs">Выберите локацию</span>}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-md border p-2">
                  <span className="text-sm font-medium">Активна</span>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isLoading || pending} />
                </div>
              )}
            />
          </form>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="secondary" size="sm" onClick={requestClose} disabled={pending}>
            Отмена
          </Button>
          <Button type="submit" form="company-edit-form" size="sm" disabled={isSaveDisabled}>
            {pending ? "Сохранение..." : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
