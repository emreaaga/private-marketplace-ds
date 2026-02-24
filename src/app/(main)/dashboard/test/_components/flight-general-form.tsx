"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import { cn } from "@/shared/lib/utils";
import type { FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Input } from "@/shared/ui/atoms/input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import { ServiceLookupSelect } from "../../logistics/flights/_components/service-lookup-select";

import type { EditFlightFormValues } from "./edit-flight.utils";
import { FlightWeightControl } from "./flight-weight-control";

interface FlightGeneralFormProps {
  mode: "create" | "edit";
}

export function FlightGeneralForm({ mode }: FlightGeneralFormProps) {
  const { control, setValue } = useFormContext<FlightFormValues | EditFlightFormValues>();

  const airPartnerId = useWatch({ control, name: "air_partner_id" });

  const getFieldClassName = (isDirty: boolean, extra?: string) =>
    cn(mode === "edit" && isDirty && "rounded-md ring-2 ring-yellow-400", extra);

  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="departure_location"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />
            </div>
          )}
        />
        <Controller
          name="arrival_location"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="air_partner_id"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <CompanySelect
                type="air_partner"
                placeholder="Авиапартнёр"
                value={field.value as number}
                onChange={(id) => {
                  field.onChange(id);
                  if (mode === "create") {
                    setValue("air_service_id", undefined);
                    setValue("air_kg_price", "");
                  }
                }}
              />
            </div>
          )}
        />

        {mode === "create" ? (
          <ServiceLookupSelect
            name="air_service_id"
            priceFieldName="air_kg_price"
            companyId={airPartnerId as number}
            placeholder="Услуга авиапартнёра"
          />
        ) : (
          <Controller
            name="air_kg_price"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                placeholder="Цена $/кг"
                {...field}
                className={cn(fieldState.isDirty && "border-yellow-400 bg-yellow-50")}
              />
            )}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="sender_customs_id"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <CompanySelect
                type="customs_broker"
                placeholder="Отпр. (таможня)"
                value={field.value as number}
                onChange={field.onChange}
              />
            </div>
          )}
        />
        <Controller
          name="receiver_customs_id"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <CompanySelect
                type="customs_broker"
                placeholder="Получ. (таможня)"
                value={field.value as number}
                onChange={field.onChange}
              />
            </div>
          )}
        />
      </div>

      {/* Секция Дат */}
      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="loading_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <DateTimePicker placeholder="Погрузка" {...field} />
            </div>
          )}
        />
        <Controller
          name="unloading_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <DateTimePicker placeholder="Разгрузка" {...field} />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Controller
          name="departure_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <DateTimePicker placeholder="Вылет" {...field} />
            </div>
          )}
        />
        <Controller
          name="arrival_at"
          control={control}
          render={({ field, fieldState }) => (
            <div className={getFieldClassName(fieldState.isDirty)}>
              <DateTimePicker placeholder="Прилет" {...field} />
            </div>
          )}
        />
      </div>

      {mode === "edit" && (
        <div className="grid grid-cols-1 gap-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="awb_number"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-1.5">
                  <label className="text-muted-foreground px-1 text-[10px] font-semibold tracking-wider uppercase">
                    AWB Номер
                  </label>
                  <Input
                    {...field}
                    placeholder="Номер накладной"
                    className={cn(fieldState.isDirty && "ring-1 ring-yellow-400")}
                  />
                </div>
              )}
            />
            <FlightWeightControl />
          </div>
        </div>
      )}
    </div>
  );
}
