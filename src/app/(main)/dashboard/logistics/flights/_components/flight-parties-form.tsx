"use client";
import { useState } from "react";

import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Field } from "@/shared/ui/atoms/field";
import { Input } from "@/shared/ui/atoms/input";
import SelectWithFlagsDemo from "@/shared/ui/atoms/select-with-flags";

export function FlightPartiesForm() {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [arrivalDate, setArrivalDate] = useState<Date>();

  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <Input placeholder="Номер рейса" />
        </Field>
        <Field>
          <Input placeholder="Номер накладной" />
        </Field>
      </div>

      <Field>
        <Input placeholder="Агентство рейса" />
      </Field>

      <div className="flex gap-2">
        <Field className="flex-1">
          <SelectWithFlagsDemo />
        </Field>

        <Field className="flex-1">
          <SelectWithFlagsDemo />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <DateTimePicker placeholder="Дата вылета" value={departureDate} onChange={setDepartureDate} />

        <DateTimePicker placeholder="Дата прилёта" value={arrivalDate} onChange={setArrivalDate} />
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <Input placeholder="Отправитель (таможня)" />
        </Field>
        <Field>
          <Input placeholder="Получатель (таможня)" />
        </Field>
      </div>

      <Field>
        <Input placeholder="Время погрузки" className="w-48" />
      </Field>
    </div>
  );
}
