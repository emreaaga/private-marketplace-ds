"use client";

import { useState } from "react";

import { Controller, useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { servicesService } from "@/features/services/api/services";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { FlightFormValues } from "@/shared/types/flight/flight-create.schema";
import type { Service } from "@/shared/types/services/services.model";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Field } from "@/shared/ui/atoms/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

function money2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "—";
}

export function FlightPartiesForm() {
  const { control, setValue, watch } = useFormContext<FlightFormValues>();

  const airPartnerId = watch("air_partner_id"); // number | undefined
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);

  async function loadServices(companyId: number) {
    setLoadingServices(true);
    try {
      const data = await servicesService.getServices({
        company_id: companyId,
        type: "flight",
        pricing_type: "per_kg",
      });
      setServices(data);
    } catch {
      setServices([]);
      toast.error("Не удалось загрузить услуги");
    } finally {
      setLoadingServices(false);
    }
  }

  const serviceSelectDisabled = !airPartnerId || loadingServices;

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
                value={field.value}
                onChange={(id) => {
                  field.onChange(id);
                  setServices([]);
                  setValue("air_service_id", undefined, { shouldValidate: true, shouldDirty: true });
                  setValue("air_kg_price", "", { shouldValidate: true, shouldDirty: true });

                  if (id) void loadServices(id);
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
                value={field.value ? String(field.value) : undefined}
                onValueChange={(v) => {
                  const serviceId = Number(v);
                  field.onChange(serviceId);

                  const s = services.find((x) => x.id === serviceId);
                  setValue("air_kg_price", s ? money2(s.price) : "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                disabled={serviceSelectDisabled}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      !airPartnerId
                        ? "Услуга авиапартнёра"
                        : loadingServices
                          ? "Загрузка..."
                          : services.length === 0
                            ? "Нет услуг"
                            : "Услуга авиапартнёра"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {services.length === 0 && airPartnerId && !loadingServices ? (
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
                value={field.value}
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
                value={field.value}
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
