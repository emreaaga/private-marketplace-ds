"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { CompanyServicePopoverSelect } from "@/entities/company";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import { FlightFormValues } from "../model/flight-create.schema";

interface DomesticFlightGeneralFormProps {
  isVisible?: boolean;
}

export function DomesticFlightGeneralForm({ isVisible = true }: DomesticFlightGeneralFormProps) {
  const { control, setValue } = useFormContext<FlightFormValues>();

  const departureLocation = useWatch({ control, name: "departure_location" });
  const departureCountry = departureLocation?.country ?? undefined;

  const airServiceId = useWatch({ control, name: "air_service_id" });

  return (
    <div className="space-y-4 text-xs">
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

      {/* Выбор перевозчика и услуги в одном месте */}
      <div className="grid grid-cols-1">
        <Controller
          name="air_partner_id"
          control={control}
          render={({ field }) => (
            <CompanyServicePopoverSelect
              placeholder="Выберите перевозчика и тариф"
              country={departureCountry}
              enabled={isVisible && !!departureCountry}
              // Передаем текущие значения из формы
              value={{
                companyId: field.value as number,
                serviceId: airServiceId as number,
              }}
              onChangeAction={(val, price) => {
                // 1. Обновляем ID партнера (основное поле контроллера)
                field.onChange(val.companyId);

                // 2. Обновляем ID услуги
                setValue("air_service_id", val.serviceId as number, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                // 3. Обновляем цену за кг (если она есть в схеме)
                if (price !== undefined) {
                  setValue("air_kg_price", price.toString(), {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }
              }}
            />
          )}
        />
      </div>

      {/* Остальные поля... */}
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
