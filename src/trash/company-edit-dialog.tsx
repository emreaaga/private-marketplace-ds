"use client";

import { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";

import type { UpdateCompanyPayload } from "@/features/companies/api/companies";
import { useCompanyDetail } from "@/features/companies/queries/use-company-detail";
import { cn } from "@/shared/lib/utils";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { CompanyType } from "@/shared/types/company/company.types";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";
import { Switch } from "@/shared/ui/atoms/switch";

type LocationValue = {
  country: CountryCode | null;
  city: string | null;
  district?: null;
};

type FormValues = Omit<UpdateCompanyPayload, "location"> & {
  location: LocationValue;
};

type Props = {
  open: boolean;
  companyId: number | null;
  pending?: boolean;
  onOpenChangeAction(open: boolean): void;
  onSubmitAction?: (companyId: number, values: UpdateCompanyPayload) => void | Promise<unknown>;
};

const DEFAULT_TYPE = "platform" as CompanyType;

const EMPTY: FormValues = {
  name: "",
  type: DEFAULT_TYPE,
  location: { country: null, city: null, district: null },
  is_active: true,
};

export function CompanyEditDialog({ open, companyId, pending = false, onOpenChangeAction, onSubmitAction }: Props) {
  const isEnabled = open && companyId != null;
  const { data: company, isLoading, isError } = useCompanyDetail(companyId, isEnabled);

  const normalizedData = useMemo<FormValues>(() => {
    if (!company) return EMPTY;

    const typeKeys = Object.keys(COMPANY_TYPE_META) as CompanyType[];

    const safeCountry = company.country as CountryCode;
    const cityCode = company.city;

    const countryMeta = COUNTRY_META[safeCountry];

    const cityExists = countryMeta ? Object.values(countryMeta.cities).some((c) => c.code === cityCode) : false;

    return {
      name: company.name,
      type: typeKeys.includes(company.type as CompanyType) ? (company.type as CompanyType) : DEFAULT_TYPE,
      location: {
        country: safeCountry,
        city: cityExists ? cityCode : null,
        district: null,
      },
      is_active: !!company.is_active,
    };
  }, [company]);

  const form = useForm<FormValues>({
    defaultValues: EMPTY,
    values: open && company ? normalizedData : EMPTY,
  });

  const requestClose = () => {
    if (pending || form.formState.isSubmitting) return;
    onOpenChangeAction(false);
  };

  const submit = async (values: FormValues) => {
    if (companyId == null || !onSubmitAction) return;

    const { country, city } = values.location;
    if (!country || !city) return;

    try {
      const payload = {
        name: values.name.trim(),
        type: values.type,
        location: {
          country,
          city,
        },
        is_active: values.is_active,
      };

      await onSubmitAction(companyId, payload);
      onOpenChangeAction(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const isSaveDisabled = pending || isLoading || !form.formState.isDirty || !form.formState.isValid;

  return (
    <Dialog open={open} onOpenChange={requestClose}>
      <DialogContent className="border-muted/40 overflow-hidden rounded-xl p-0 font-sans shadow-2xl sm:max-w-115">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {isLoading ? "Загрузка..." : `Компания #${companyId}`}
          </DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>

        {isError && <div className="text-destructive py-8 text-center text-sm font-medium">Ошибка загрузки данных</div>}

        {!isError && (
          <form id="company-edit-form" className="space-y-4 px-6 py-4" onSubmit={form.handleSubmit(submit)}>
            <FloatingLabelInput
              label="Название"
              disabled={isLoading || pending}
              {...form.register("name", { required: true, minLength: 2 })}
              className={cn(form.formState.errors.name && "border-destructive focus-visible:ring-destructive/20")}
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
                  <SelectTrigger
                    className={cn(
                      "h-10 w-full px-3 text-sm font-normal shadow-sm transition-all",
                      "bg-background border-input hover:bg-accent/50",
                      form.formState.errors.type && "border-destructive focus:ring-destructive/20",
                    )}
                  >
                    <SelectValue placeholder="Тип компании" />
                  </SelectTrigger>
                  <SelectContent className="border-muted/40 rounded-xl shadow-xl">
                    {(Object.keys(COMPANY_TYPE_META) as CompanyType[]).map((t) => {
                      const meta = COMPANY_TYPE_META[t];
                      return (
                        <SelectItem key={t} value={t} className="rounded-lg py-2">
                          <div className="flex items-center gap-2.5">
                            <meta.Icon className="text-muted-foreground/70 h-3.5 w-3.5" />
                            <span className="text-sm">{meta.label}</span>
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
                <CountryCityPopoverSelect
                  mode="country-city"
                  value={field.value}
                  onChange={(v) => {
                    field.onChange(v);
                    form.clearErrors("location");
                  }}
                  placeholder="Страна · Город"
                  className={cn("h-10 font-normal", fieldState.error && "border-destructive ring-destructive/20")}
                />
              )}
            />

            <Controller
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <div className="border-input bg-muted/5 hover:bg-muted/10 flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors">
                  <span className="text-foreground/80 text-[13px] font-medium">Статус аккаунта</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground/60 text-[11px] tracking-wider uppercase">
                      {field.value ? "Активна" : "Пауза"}
                    </span>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isLoading || pending} />
                  </div>
                </div>
              )}
            />
          </form>
        )}

        <DialogFooter className="bg-muted/5 gap-2 border-t px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={requestClose}
            disabled={pending}
            className="text-muted-foreground hover:text-foreground font-normal"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            form="company-edit-form"
            size="sm"
            disabled={isSaveDisabled}
            className={cn(
              "h-8 min-w-25 rounded-md px-4 text-[13px] font-medium transition-all",
              "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black",
              "shadow-sm active:scale-[0.98]",
            )}
          >
            {pending ? (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Сохранение</span>
              </div>
            ) : (
              "Сохранить"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
