"use client";

import { useMemo } from "react";

import { useFormContext, Controller } from "react-hook-form";

import { useServicesLookup } from "@/features/services/queries/use-services-lookup";
import type { ServicePrice } from "@/shared/types/services/services.pricing";
import type { ServiceType } from "@/shared/types/services/services.types";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

function money2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "—";
}

interface ServiceLookupSelectProps {
  name: string;
  priceFieldName?: string;
  companyId?: number;
  serviceType?: ServiceType;
  pricingType?: ServicePrice;
  placeholder?: string;
}

export function ServiceLookupSelect({
  name,
  priceFieldName,
  companyId,
  serviceType = "flight",
  pricingType = "per_kg",
  placeholder = "Выберите услугу",
}: ServiceLookupSelectProps) {
  const { control, setValue } = useFormContext();

  const {
    data: services = [],
    isFetching,
    isError,
  } = useServicesLookup({
    company_id: companyId,
    type: serviceType,
    pricing_type: pricingType,
  });

  const serviceById = useMemo(() => new Map(services.map((s) => [s.id, s])), [services]);

  const isDisabled = companyId == null || isFetching;

  const getPlaceholder = () => {
    if (companyId == null) return "Выберите партнёра";
    if (isFetching) return "Загрузка...";
    if (isError) return "Ошибка загрузки";
    if (services.length === 0) return "Нет услуг";
    return placeholder;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value == null ? "" : String(field.value)}
          disabled={isDisabled || services.length === 0}
          onValueChange={(v) => {
            if (v === "" || v === "__empty__") {
              field.onChange(undefined);
              if (priceFieldName) setValue(priceFieldName, "", { shouldDirty: true });
              return;
            }

            const serviceId = Number(v);
            field.onChange(serviceId);

            if (priceFieldName) {
              const service = serviceById.get(serviceId);
              setValue(priceFieldName, service ? money2(service.price) : "", {
                shouldDirty: true,
                shouldValidate: true,
              });
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={getPlaceholder()} />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={String(s.id)}>
                ${money2(s.price)} / кг
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
