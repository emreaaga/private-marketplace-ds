"use client";
import { useState } from "react";

import { DateTimePicker } from "@/shared/ui/atoms/date-picker";
import { Field } from "@/shared/ui/atoms/field";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import SelectWithFlagsDemo from "@/shared/ui/atoms/select-with-flags";

export function FlightPartiesForm() {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [arrivalDate, setArrivalDate] = useState<Date>();
  const [loadingTime, setLoadingTime] = useState<Date>();
  const [unloadingTime, setUnloadingTime] = useState<Date>();

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

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Агентство рейса" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agent-1">Агентство 1</SelectItem>
              <SelectItem value="agent-2">Агентство 2</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Airlines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uz">Uzbekistan Airways</SelectItem>
              <SelectItem value="tk">Turkish Airlines</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Отправитель (таможня)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customs-1">Таможня 1</SelectItem>
              <SelectItem value="customs-2">Таможня 2</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Получатель (таможня)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customs-a">Таможня 1</SelectItem>
              <SelectItem value="customs-b">Таможня 2</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Field>
          <DateTimePicker placeholder="Время погрузки" value={loadingTime} onChange={setLoadingTime} />
        </Field>

        <Field>
          <DateTimePicker placeholder="Время отгрузки" value={unloadingTime} onChange={setUnloadingTime} />
        </Field>
      </div>
    </div>
  );
}
