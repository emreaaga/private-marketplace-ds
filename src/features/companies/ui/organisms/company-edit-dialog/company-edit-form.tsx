"use client";

import { Controller, type UseFormReturn } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { CompanyType } from "@/shared/types/company/company.types";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";
import { Switch } from "@/shared/ui/atoms/switch";

import type { CompanyFormValues } from "./types";

interface CompanyEditFormProps {
  form: UseFormReturn<CompanyFormValues>;
  isLoading?: boolean;
  pending?: boolean;
  onSubmit: (values: CompanyFormValues) => void;
}

export function CompanyEditForm({ form, isLoading, pending, onSubmit }: CompanyEditFormProps) {
  const { dirtyFields, errors } = form.formState;

  const getBorderColor = (fieldName: keyof CompanyFormValues) => {
    if (errors[fieldName]) return "border-destructive focus-visible:ring-destructive/20";
    if (dirtyFields[fieldName]) return "border-yellow-400 focus-visible:ring-yellow-400/20";
    return "";
  };

  return (
    <form id="company-edit-form" className="space-y-4 px-6 py-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FloatingLabelInput
        label="Название"
        disabled={isLoading || pending}
        {...form.register("name", { required: true, minLength: 2 })}
        className={cn("transition-colors", getBorderColor("name"))}
      />

      <Controller
        control={form.control}
        name="type"
        render={({ field }) => (
          <Select key={field.value} value={field.value} onValueChange={field.onChange} disabled={isLoading || pending}>
            <SelectTrigger
              className={cn(
                "h-10 w-full px-3 text-sm font-normal shadow-sm transition-all",
                "bg-background border-input hover:bg-accent/50",
                getBorderColor("type"),
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
        render={({ field }) => (
          <CountryCityPopoverSelect
            mode="country-city"
            value={field.value}
            onChange={(v) => {
              field.onChange(v);
              form.clearErrors("location");
            }}
            placeholder="Страна · Город"
            className={cn("h-10 font-normal transition-colors", getBorderColor("location"))}
          />
        )}
      />

      <Controller
        control={form.control}
        name="is_active"
        render={({ field }) => (
          <div
            className={cn(
              "border-input bg-muted/5 hover:bg-muted/10 flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors",
              dirtyFields.is_active && "border-yellow-400",
            )}
          >
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
  );
}
