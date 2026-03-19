"use client";

import { Calendar } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import { ServiceTypeSelect } from "@/entities/service";
import { FORM_FIELD_STYLES, getFieldStatusClass } from "@/shared/config/form-styles";
import { cn } from "@/shared/lib/utils";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Form, FormControl, FormField, FormItem } from "@/shared/ui/atoms/form";
import { Switch } from "@/shared/ui/atoms/switch";

import type { ServiceEditFormValues } from "../model/service-edit.types";

interface ServiceEditFormProps {
  form: UseFormReturn<ServiceEditFormValues>;
  service: any;
  isLoading?: boolean;
  pending?: boolean;
  onSubmit: (values: ServiceEditFormValues) => void;
}

export function ServiceEditForm({ form, service, isLoading, pending, onSubmit }: ServiceEditFormProps) {
  return (
    <Form {...form}>
      <form id="service-edit-form" className="space-y-4 px-6 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FloatingLabelInput
          label="Фирма"
          value={service.company_name}
          disabled
          readOnly
          className={FORM_FIELD_STYLES.base}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <ServiceTypeSelect
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading || pending}
                  className={getFieldStatusClass(fieldState.invalid, fieldState.isDirty)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  label="Цена"
                  mode="decimal"
                  disabled={isLoading || pending}
                  {...field}
                  className={cn(FORM_FIELD_STYLES.base, getFieldStatusClass(fieldState.invalid, fieldState.isDirty))}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
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
                  <span className="text-foreground/80 text-[13px] font-medium">Активна</span>
                  <div className="flex items-center gap-3">
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isLoading || pending} />
                  </div>
                </div>
              </FormItem>
            )}
          />

          <FloatingLabelInput
            label="Создана"
            value={new Date(service.created_at).toLocaleDateString("ru-RU")}
            disabled
            readOnly
            icon={Calendar}
            className={FORM_FIELD_STYLES.base}
          />
        </div>
      </form>
    </Form>
  );
}
