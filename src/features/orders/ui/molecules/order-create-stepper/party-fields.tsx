"use client";
import { Input } from "@/shared/ui/atoms/input";

import { Party } from "./types";

export function PartyFields({
  title,
  value,
  onChange,
}: {
  title: string;
  value: Party;
  onChange: (patch: Partial<Party>) => void;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>

      <Input placeholder="TR" disabled />
      <Input placeholder="Код" value={value.code} onChange={(e) => onChange({ code: e.target.value })} />

      <div className="flex">
        <Input
          className="flex-1"
          placeholder="Имя"
          value={value.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
        />
        <Input
          className="flex-1"
          placeholder="Фамилия"
          value={value.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
        />
      </div>

      <div className="flex">
        <Input
          className="flex-1"
          placeholder="Паспорт"
          value={value.passport1}
          onChange={(e) => onChange({ passport1: e.target.value })}
        />
        <Input
          className="flex-1"
          placeholder="Паспорт 2"
          value={value.passport2 ?? ""}
          onChange={(e) => onChange({ passport2: e.target.value })}
        />
      </div>

      <div className="flex">
        <Input
          className="flex-1"
          placeholder="Город"
          value={value.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />
        <Input
          className="flex-1"
          placeholder="Район"
          value={value.district}
          onChange={(e) => onChange({ district: e.target.value })}
        />
      </div>

      <Input placeholder="Телефон" value={value.phone} onChange={(e) => onChange({ phone: e.target.value })} />
      <Input placeholder="Адрес" value={value.address} onChange={(e) => onChange({ address: e.target.value })} />
    </div>
  );
}
