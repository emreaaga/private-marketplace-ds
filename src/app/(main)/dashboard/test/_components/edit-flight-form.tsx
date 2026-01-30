"use client";

import { Controller, useFormContext } from "react-hook-form";

import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import { cn } from "@/shared/lib/utils";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Input } from "@/shared/ui/atoms/input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import type { EditFlightFormValues } from "./edit-flight-dialog";

export function EditFlightForm() {
  const { control } = useFormContext<EditFlightFormValues>();

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="departure_location"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />
            </div>
          )}
        />

        <Controller
          name="arrival_location"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="air_partner_id"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <CompanySelect
                type="air_partner"
                placeholder="Авиапартнёр"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <Controller
          name="air_kg_price"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              placeholder="Цена $/кг"
              value={field.value}
              onChange={field.onChange}
              className={cn(fieldState.isDirty && "border-yellow-400 bg-yellow-50")}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="sender_customs_id"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <CompanySelect
                type="customs_broker"
                placeholder="Отпр. (таможня)"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />

        <Controller
          name="receiver_customs_id"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <CompanySelect
                type="customs_broker"
                placeholder="Получ. (таможня)"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="loading_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <DateTimePicker placeholder="Дата/время погрузки" value={field.value} onChange={field.onChange} />
            </div>
          )}
        />

        <Controller
          name="unloading_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <DateTimePicker placeholder="Дата/время разгрузки" value={field.value} onChange={field.onChange} />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="departure_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <DateTimePicker placeholder="Дата/время вылета" value={field.value} onChange={field.onChange} />
            </div>
          )}
        />

        <Controller
          name="arrival_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={cn(fieldState.isDirty && "rounded-md ring-2 ring-yellow-400")}>
              <DateTimePicker placeholder="Дата/время прилёта" value={field.value} onChange={field.onChange} />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="awb_number"
          control={control}
          render={({ field, fieldState }) => {
            const isEmpty = !field.value;
            return (
              <Input
                placeholder="Накладной номер"
                value={field.value}
                onChange={field.onChange}
                className={cn(
                  isEmpty && "border-yellow-400 bg-yellow-50 placeholder:text-yellow-700",
                  fieldState.isDirty && "ring-1 ring-yellow-400",
                )}
              />
            );
          }}
        />

        <Controller
          name="final_gross_weight_kg"
          control={control}
          render={({ field, fieldState }) => {
            const isEmpty = field.value.trim() === "";

            return (
              <Input
                placeholder="Фактический вес"
                value={field.value}
                onChange={field.onChange}
                inputMode="decimal"
                className={cn(
                  isEmpty && "border-yellow-400 bg-yellow-50 text-yellow-900 placeholder:text-yellow-700",
                  fieldState.isDirty && "ring-1 ring-yellow-400",
                )}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
