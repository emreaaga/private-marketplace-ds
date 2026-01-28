"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";

import { servicesService } from "@/features/services/api/services";
import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { CountryCode } from "@/shared/types/geography/country.types";
import type { Service } from "@/shared/types/services/services.model";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Field } from "@/shared/ui/atoms/field";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

type CountryCityValue = {
  country: CountryCode | null;
  city: string | null;
};

export type FlightFormValues = {
  departure_location: CountryCityValue;
  arrival_location: CountryCityValue;

  air_partner_id?: number;
  sender_customs_id?: number;
  receiver_customs_id?: number;

  air_service_id?: number;
  air_kg_price?: string;

  loading_at?: Date;
  departure_at?: Date;
  arrival_at?: Date;
  unloading_at?: Date;
};

export type FlightPartiesFormHandle = {
  getValues: () => FlightFormValues;
};

type PricedService = Service & { price: number | string };

function toMoney2(v: unknown): string | undefined {
  const n = Number(v);
  if (!Number.isFinite(n)) return undefined;
  return n.toFixed(2);
}

export const FlightPartiesForm = forwardRef<FlightPartiesFormHandle, object>(function FlightPartiesForm(_props, ref) {
  const [airPartnerId, setAirPartnerId] = useState<number | undefined>();
  const [senderCustomsId, setSenderCustomsId] = useState<number | undefined>();
  const [receiverCustomsId, setReceiverCustomsId] = useState<number | undefined>();

  const [airServices, setAirServices] = useState<PricedService[]>([]);
  const [airServiceId, setAirServiceId] = useState<number | undefined>();

  const selectedAirService = useMemo(() => airServices.find((s) => s.id === airServiceId), [airServices, airServiceId]);

  const [departureLocation, setDepartureLocation] = useState<CountryCityValue>({ country: null, city: null });
  const [arrivalLocation, setArrivalLocation] = useState<CountryCityValue>({ country: null, city: null });

  const [loadingAt, setLoadingAt] = useState<Date>();
  const [departureAt, setDepartureAt] = useState<Date>();
  const [arrivalAt, setArrivalAt] = useState<Date>();
  const [unloadingAt, setUnloadingAt] = useState<Date>();

  useImperativeHandle(
    ref,
    () => ({
      getValues: () => ({
        departure_location: departureLocation,
        arrival_location: arrivalLocation,

        air_partner_id: airPartnerId,
        sender_customs_id: senderCustomsId,
        receiver_customs_id: receiverCustomsId,

        air_service_id: airServiceId,
        air_kg_price: selectedAirService ? toMoney2(selectedAirService.price) : undefined,

        loading_at: loadingAt,
        departure_at: departureAt,
        arrival_at: arrivalAt,
        unloading_at: unloadingAt,
      }),
    }),
    [
      departureLocation,
      arrivalLocation,
      airPartnerId,
      senderCustomsId,
      receiverCustomsId,
      airServiceId,
      selectedAirService,
      loadingAt,
      departureAt,
      arrivalAt,
      unloadingAt,
    ],
  );

  const handleAirPartnerChange = (id?: number) => {
    setAirPartnerId(id);
    setAirServices([]);
    setAirServiceId(undefined);
  };

  useEffect(() => {
    if (!airPartnerId) return;

    servicesService
      .getServices({
        company_id: airPartnerId,
        type: "flight",
        pricing_type: "per_kg",
      })
      .then((services) => {
        const priced = services as PricedService[];
        setAirServices(priced);
        if (priced.length === 1) setAirServiceId(priced[0].id);
      });
  }, [airPartnerId]);

  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <CompanySelect
            type="air_partner"
            placeholder="Авиапартнёр"
            value={airPartnerId}
            onChange={handleAirPartnerChange}
          />
        </Field>

        <Field>
          <Select
            value={airServiceId ? String(airServiceId) : undefined}
            onValueChange={(v) => setAirServiceId(Number(v))}
            disabled={!airPartnerId || airServices.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Услуга авиапартнёра" />
            </SelectTrigger>

            <SelectContent>
              {airServices.map((service) => (
                <SelectItem key={service.id} value={String(service.id)}>
                  ${Number(service.price).toFixed(2)} / кг
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="flex gap-2">
        <Field className="flex-1">
          <CountryCityPopoverSelect value={departureLocation} onChange={setDepartureLocation} />
        </Field>

        <Field className="flex-1">
          <CountryCityPopoverSelect value={arrivalLocation} onChange={setArrivalLocation} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <DateTimePicker placeholder="Дата/время погрузки" value={loadingAt} onChange={setLoadingAt} />
        </Field>
        <Field>
          <DateTimePicker placeholder="Дата/время разгрузки" value={unloadingAt} onChange={setUnloadingAt} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <CompanySelect
            type="customs_broker"
            placeholder="Отпр. (таможня)"
            value={senderCustomsId}
            onChange={setSenderCustomsId}
          />
        </Field>

        <Field>
          <CompanySelect
            type="customs_broker"
            placeholder="Получ. (таможня)"
            value={receiverCustomsId}
            onChange={setReceiverCustomsId}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <DateTimePicker placeholder="Дата/время вылета" value={departureAt} onChange={setDepartureAt} />
        <DateTimePicker placeholder="Дата/время прилёта" value={arrivalAt} onChange={setArrivalAt} />
      </div>
    </div>
  );
});
