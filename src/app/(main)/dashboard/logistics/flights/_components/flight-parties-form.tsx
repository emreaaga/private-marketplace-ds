"use client";

import { useEffect, useMemo } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { useServicesLookup } from "@/features/services/queries/use-services-lookup";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Field } from "@/shared/ui/atoms/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

function money2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "—";
}

function toFiniteNumber(v: unknown): number | undefined {
  if (typeof v === "number") return Number.isFinite(v) ? v : undefined;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export function FlightPartiesForm() {
  const { control, setValue } = useFormContext<FlightFormValues>();

  // ✅ лучше чем watch() в таком кейсе
  const airPartnerIdRaw = useWatch({ control, name: "air_partner_id" });
  const companyId = toFiniteNumber(airPartnerIdRaw);

  const {
    data: services = [],
    isFetching: fetchingServices,
    isError: servicesError,
  } = useServicesLookup({
    company_id: companyId,
    type: "flight",
    pricing_type: "per_kg",
  });

  useEffect(() => {
    if (servicesError) toast.error("Не удалось загрузить услуги");
  }, [servicesError]);

  const serviceById = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);

  // ✅ НЕ дизейблим во время fetch — пусть можно открыть и увидеть "Загрузка..."
  const serviceSelectDisabled = companyId == null;

  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <Controller
            name="air_partner_id"
            control={control}
            render={({ field }) => (
              <CompanySelect
                type="air_partner"
                placeholder="Авиапартнёр"
                value={toFiniteNumber(field.value)}
                onChange={(id) => {
                  field.onChange(id);

                  // сбрасываем зависимые поля
                  setValue("air_service_id", undefined, { shouldValidate: true, shouldDirty: true });
                  setValue("air_kg_price", "", { shouldValidate: true, shouldDirty: true });
                }}
              />
            )}
          />
        </Field>

        <Field>
          <Controller
            name="air_service_id"
            control={control}
            render={({ field }) => (
              <Select
                // ✅ всегда controlled
                value={field.value == null ? "" : String(field.value)}
                onValueChange={(v) => {
                  if (v === "") {
                    field.onChange(undefined);
                    setValue("air_kg_price", "", { shouldValidate: true, shouldDirty: true });
                    return;
                  }

                  const serviceId = Number(v);
                  field.onChange(Number.isFinite(serviceId) ? serviceId : undefined);

                  const s = Number.isFinite(serviceId) ? serviceById.get(serviceId) : undefined;
                  setValue("air_kg_price", s ? money2(s.price) : "", { shouldValidate: true, shouldDirty: true });
                }}
                disabled={serviceSelectDisabled}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      companyId == null
                        ? "Услуга авиапартнёра"
                        : fetchingServices
                          ? "Загрузка..."
                          : servicesError
                            ? "Ошибка загрузки"
                            : services.length === 0
                              ? "Нет услуг"
                              : "Услуга авиапартнёра"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {companyId == null ? (
                    <SelectItem value="__choose__" disabled>
                      Сначала выберите авиапартнёра
                    </SelectItem>
                  ) : fetchingServices ? (
                    <SelectItem value="__loading__" disabled>
                      Загрузка...
                    </SelectItem>
                  ) : servicesError ? (
                    <SelectItem value="__error__" disabled>
                      Ошибка загрузки
                    </SelectItem>
                  ) : services.length === 0 ? (
                    <SelectItem value="__empty__" disabled>
                      Нет услуг
                    </SelectItem>
                  ) : (
                    services.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        ${money2(s.price)} / кг
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <div className="flex gap-2">
        <Field className="flex-1">
          <Controller
            name="departure_location"
            control={control}
            render={({ field }) => <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />}
          />
        </Field>

        <Field className="flex-1">
          <Controller
            name="arrival_location"
            control={control}
            render={({ field }) => <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <Controller
            name="loading_at"
            control={control}
            render={({ field }) => (
              <DateTimePicker placeholder="Дата/время погрузки" value={field.value} onChange={field.onChange} />
            )}
          />
        </Field>

        <Field>
          <Controller
            name="unloading_at"
            control={control}
            render={({ field }) => (
              <DateTimePicker placeholder="Дата/время разгрузки" value={field.value} onChange={field.onChange} />
            )}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <Controller
            name="sender_customs_id"
            control={control}
            render={({ field }) => (
              <CompanySelect
                type="customs_broker"
                placeholder="Отпр. (таможня)"
                value={toFiniteNumber(field.value)}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        <Field>
          <Controller
            name="receiver_customs_id"
            control={control}
            render={({ field }) => (
              <CompanySelect
                type="customs_broker"
                placeholder="Получ. (таможня)"
                value={toFiniteNumber(field.value)}
                onChange={field.onChange}
              />
            )}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Controller
          name="departure_at"
          control={control}
          render={({ field }) => (
            <DateTimePicker placeholder="Дата/время вылета" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name="arrival_at"
          control={control}
          render={({ field }) => (
            <DateTimePicker placeholder="Дата/время прилёта" value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
    </div>
  );
}
