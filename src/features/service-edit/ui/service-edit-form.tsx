"use client";

import { Building2, Calendar, DollarSign } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";

import { SERVICE_TYPE_META } from "@/entities/service/model/services.types.meta";
import { FloatingLabelInput } from "@/shared/ui/atoms/floating-label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { Switch } from "@/shared/ui/atoms/switch";

import type { ServiceEditFormValues } from "../model/service-edit.types";

interface ServiceEditFormProps {
  form: UseFormReturn<ServiceEditFormValues>;
  service: any;
  onSubmit: (values: ServiceEditFormValues) => void;
}

export function ServiceEditForm({ form, service, onSubmit }: ServiceEditFormProps) {
  return (
    <form id="service-edit-form" className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FloatingLabelInput label="Компания" value={service.company_name} disabled readOnly icon={Building2} />

      <Controller
        control={form.control}
        name="type"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Тип услуги" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SERVICE_TYPE_META).map(([key, { label, Icon }]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <Icon className="text-muted-foreground h-4 w-4" />
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <FloatingLabelInput
        label="Цена ($)"
        type="number"
        step="0.01"
        icon={DollarSign}
        {...form.register("price", { valueAsNumber: true })}
      />

      <div className="grid grid-cols-2 gap-3">
        <Controller
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <span className="text-xs font-medium">Активна</span>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </div>
          )}
        />
        <FloatingLabelInput
          label="Создана"
          value={new Date(service.created_at).toLocaleDateString("ru-RU")}
          disabled
          readOnly
          icon={Calendar}
        />
      </div>
    </form>
  );
}
