"use client";

import type { UseFormReturn } from "react-hook-form";

import { CompanyTypeSelect } from "@/entities/company";
import type { EditCompanySchema } from "@/entities/company/model/edit-company.schema";
import { FORM_FIELD_STYLES, getFieldStatusClass } from "@/shared/config/form-styles";
import { cn } from "@/shared/lib/utils";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/atoms/form";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";
import { Switch } from "@/shared/ui/atoms/switch";

interface CompanyEditFormProps {
  form: UseFormReturn<EditCompanySchema>;
  isLoading?: boolean;
  pending?: boolean;
  onSubmit: (values: EditCompanySchema) => void;
}

export function CompanyEditForm({ form, isLoading, pending, onSubmit }: CompanyEditFormProps) {
  return (
    <Form {...form}>
      <form id="company-edit-form" className="space-y-4 px-6 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  label="Название"
                  disabled={isLoading || pending}
                  {...field}
                  className={cn(FORM_FIELD_STYLES.base, getFieldStatusClass(fieldState.invalid, fieldState.isDirty))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <CompanyTypeSelect
                  {...field}
                  disabled={isLoading || pending}
                  error={fieldState.invalid}
                  isDirty={fieldState.isDirty}
                  className={getFieldStatusClass(fieldState.invalid, fieldState.isDirty)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <CountryCityPopoverSelect
                  mode="country-city"
                  value={field.value}
                  onChange={(v) => {
                    field.onChange(v);
                    form.clearErrors("location");
                  }}
                  placeholder="Страна · Город"
                  className={cn(
                    "h-10 font-normal transition-all",
                    getFieldStatusClass(fieldState.invalid, fieldState.isDirty),
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field, fieldState }) => (
            <FormItem>
              <div
                className={cn(
                  "border-input bg-muted/5 hover:bg-muted/10 flex items-center justify-between rounded-lg border px-3 py-2.5 transition-all",
                  getFieldStatusClass(fieldState.invalid, fieldState.isDirty),
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
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
