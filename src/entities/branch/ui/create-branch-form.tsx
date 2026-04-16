"use client";

import { useEffect } from "react";

import { Check, Globe, Loader2 } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { CountryCode } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";
import { CityMultiSelect } from "@/shared/ui/city-multi-select";

import { useCreateBranch } from "../queries/use-create-branch";

const BRANCH_TYPES = [{ value: "warehouse", label: "Cклад" }];

interface CreateBranchValues {
  type: string;
  location: {
    country: CountryCode | null;
    city: string | null;
  };
  coverage_cities: string[];
}

type Props = {
  companyId: number;
  initialCountry?: CountryCode | null | undefined;
  onCloseAction: () => void;
};

export function CreateBranchForm({ companyId, onCloseAction, initialCountry }: Props) {
  const { mutate, isPending } = useCreateBranch(companyId);

  const { handleSubmit, reset, control, setValue } = useForm<CreateBranchValues>({
    defaultValues: {
      type: "warehouse",
      // 1. Устанавливаем начальную страну из пропсов
      location: { country: initialCountry ?? null, city: null },
      coverage_cities: [],
    },
    mode: "onChange",
  });

  const watchedValues = useWatch({ control });
  const { type, location, coverage_cities } = watchedValues;

  const isValid = !!location?.country && !!location?.city && !!type;

  // UX-фишка: если страна меняется, сбрасываем выбранные города зоны охвата,
  // так как города старой страны не могут принадлежать новой.
  useEffect(() => {
    setValue("coverage_cities", []);
  }, [location?.country, setValue]);

  const onSubmit = (values: CreateBranchValues) => {
    if (!isValid) return;

    const payload = {
      ...values,
      name: `${values.type === "warehouse" ? "Склад" : "ПВЗ"} - ${values.location.city}`,
    };

    mutate(payload as any, {
      onSuccess: () => {
        reset();
        onCloseAction();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-muted/30 mb-4 flex flex-col gap-3 rounded-lg border border-dashed p-3 transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-foreground/70 text-[10px] font-bold tracking-wider uppercase">Создание филиала</span>

        <div className="flex gap-2">
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className={cn(
              "h-6 w-6 rounded-md transition-all",
              isValid && !isPending
                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                : "text-muted-foreground/40",
            )}
            disabled={!isValid || isPending}
          >
            {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={cn(
                  "bg-background/50 h-8! w-full px-3 py-0 text-[12px] font-normal focus:ring-0",
                  "border-input hover:bg-accent/50 shadow-sm transition-all",
                )}
              >
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                {BRANCH_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="text-[12px]">
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <CountryCityPopoverSelect
              mode="only-cities"
              fixedCountryCode={initialCountry}
              value={field.value}
              onChangeAction={(val) => field.onChange(val)}
              className="bg-background/50 h-8 text-[12px]"
            />
          )}
        />
      </div>

      <div className="bg-background/40 flex flex-col gap-2 rounded-md border border-dashed p-2">
        <div className="flex items-center gap-2 px-1">
          <Globe className="text-muted-foreground/60 h-3 w-3" />
          <span className="text-muted-foreground text-[10px] font-semibold tracking-tight uppercase">Зона охвата</span>
        </div>

        <Controller
          control={control}
          name="coverage_cities"
          render={({ field }) => (
            <CityMultiSelect
              // 2. Используем location?.country (из стейта формы), чтобы мультиселект
              // реагировал на изменения в поповере выше
              countryCode={location?.country}
              value={field.value}
              onChangeAction={(val) => field.onChange(val)}
            />
          )}
        />
      </div>
    </form>
  );
}
