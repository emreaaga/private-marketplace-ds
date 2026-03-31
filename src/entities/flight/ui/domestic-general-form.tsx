"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { CompanySelect } from "@/entities/company";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import { FlightFormValues } from "../model/flight-create.schema";

interface DomesticFlightGeneralFormProps {
  isVisible?: boolean;
}

export function DomesticFlightGeneralForm({ isVisible = true }: DomesticFlightGeneralFormProps) {
  const { control } = useFormContext<FlightFormValues>();

  const departureLocation = useWatch({ control, name: "departure_location" });
  const departureCountry = departureLocation?.country ?? undefined;

  return (
    <div className="space-y-4 text-xs">
      {/* Локации */}
      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="departure_location"
          control={control}
          render={({ field }) => <CountryCityPopoverSelect value={field.value} onChangeAction={field.onChange} />}
        />
        <Controller
          name="arrival_location"
          control={control}
          render={({ field }) => <CountryCityPopoverSelect value={field.value} onChangeAction={field.onChange} />}
        />
      </div>

      {/* Партнер (например, авто-перевозчик или внутренняя авиалиния) */}
      <div className="grid grid-cols-1">
        <Controller
          name="air_partner_id"
          control={control}
          render={({ field }) => (
            <CompanySelect
              type="air_partner" // Можно сменить на "trucking_company", если есть такой тип
              placeholder="Перевозчик ISUZU"
              country={departureCountry}
              enabled={isVisible && !!departureCountry}
              value={field.value as number}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Даты вылета/прилета */}
      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="departure_at"
          control={control}
          render={({ field }) => <DateTimePicker placeholder="Отправление" {...field} />}
        />
        <Controller
          name="arrival_at"
          control={control}
          render={({ field }) => <DateTimePicker placeholder="Прибытие" {...field} />}
        />
      </div>

      {/* Даты погрузки/разгрузки */}
      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="loading_at"
          control={control}
          render={({ field }) => <DateTimePicker placeholder="Погрузка" {...field} />}
        />
        <Controller
          name="unloading_at"
          control={control}
          render={({ field }) => <DateTimePicker placeholder="Разгрузка" {...field} />}
        />
      </div>
    </div>
  );
}
