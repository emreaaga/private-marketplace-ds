"use client";

import { useEffect } from "react";

import { Controller, FormProvider, useForm } from "react-hook-form";

import { CompanySelect } from "@/features/users/ui/organisms/company-select";
import type { FlightDetails } from "@/shared/types/flight/flight.dto";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Input } from "@/shared/ui/atoms/input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

export type EditFlightFormValues = {
  departure_location: { country: CountryCode | null; city: string | null };
  arrival_location: { country: CountryCode | null; city: string | null };

  air_partner_id?: number;
  sender_customs_id?: number;
  receiver_customs_id?: number;

  air_kg_price: string;

  loading_at?: Date;
  departure_at?: Date;
  arrival_at?: Date;
  unloading_at?: Date;

  awb_number: string;

  final_gross_weight_kg: string;
};

function parseDate(v: string): Date | undefined {
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

function money2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "";
}

function kg2(v: unknown): string {
  const n = Number(v);
  return Number.isFinite(n) ? n.toFixed(2) : "";
}

function toFormValues(f: FlightDetails): EditFlightFormValues {
  return {
    departure_location: { country: f.departure_location.country, city: f.departure_location.city },
    arrival_location: { country: f.arrival_location.country, city: f.arrival_location.city },

    air_partner_id: f.air_partner_id,
    sender_customs_id: f.sender_customs_id,
    receiver_customs_id: f.receiver_customs_id,

    air_kg_price: money2(f.air_kg_price),

    loading_at: parseDate(f.loading_at),
    departure_at: parseDate(f.departure_at),
    arrival_at: parseDate(f.arrival_at),
    unloading_at: parseDate(f.unloading_at),

    awb_number: f.awb_number ?? "",

    final_gross_weight_kg: f.final_gross_weight_kg == null ? "" : kg2(f.final_gross_weight_kg),
  };
}

type EditFlightFormProps = {
  flight: FlightDetails;
};

export function EditFlightForm({ flight }: EditFlightFormProps) {
  const form = useForm<EditFlightFormValues>({
    mode: "onChange",
    defaultValues: toFormValues(flight),
  });

  useEffect(() => {
    form.reset(toFormValues(flight));
  }, [flight, form]);

  return (
    <FormProvider {...form}>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="departure_location"
            control={form.control}
            render={({ field }) => <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />}
          />

          <Controller
            name="arrival_location"
            control={form.control}
            render={({ field }) => <CountryCityPopoverSelect value={field.value} onChange={field.onChange} />}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="air_partner_id"
            control={form.control}
            render={({ field }) => (
              <CompanySelect
                type="air_partner"
                placeholder="Авиапартнёр"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="air_kg_price"
            control={form.control}
            render={({ field }) => <Input placeholder="Цена $/кг" value={field.value} onChange={field.onChange} />}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="sender_customs_id"
            control={form.control}
            render={({ field }) => (
              <CompanySelect
                type="customs_broker"
                placeholder="Отпр. (таможня)"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="receiver_customs_id"
            control={form.control}
            render={({ field }) => (
              <CompanySelect
                type="customs_broker"
                placeholder="Получ. (таможня)"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="loading_at"
            control={form.control}
            render={({ field }) => (
              <DateTimePicker placeholder="Дата/время погрузки" value={field.value} onChange={field.onChange} />
            )}
          />

          <Controller
            name="unloading_at"
            control={form.control}
            render={({ field }) => (
              <DateTimePicker placeholder="Дата/время разгрузки" value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="departure_at"
            control={form.control}
            render={({ field }) => (
              <DateTimePicker placeholder="Дата/время вылета" value={field.value} onChange={field.onChange} />
            )}
          />

          <Controller
            name="arrival_at"
            control={form.control}
            render={({ field }) => (
              <DateTimePicker placeholder="Дата/время прилёта" value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="awb_number"
            control={form.control}
            render={({ field }) => {
              const isEmpty = !field.value;

              return (
                <Input
                  placeholder="Накладной номер"
                  value={field.value}
                  onChange={field.onChange}
                  className={isEmpty ? "border-yellow-400 bg-yellow-50 placeholder:text-yellow-700" : ""}
                />
              );
            }}
          />
          <Controller
            name="final_gross_weight_kg"
            control={form.control}
            render={({ field }) => {
              const isEmpty = field.value == null || field.value === "";

              return (
                <Input
                  placeholder="Фактический вес"
                  value={field.value ?? ""}
                  readOnly
                  className={
                    isEmpty ? "border-yellow-400 bg-yellow-50 text-yellow-900 placeholder:text-yellow-700" : ""
                  }
                />
              );
            }}
          />
        </div>
      </div>
    </FormProvider>
  );
}
