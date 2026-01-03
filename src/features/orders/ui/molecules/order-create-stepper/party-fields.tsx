"use client";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/atoms/input";

import { Party } from "./types";

const ghostInput =
  "border-0 shadow-none bg-transparent transition-colors " +
  "hover:bg-muted/50 focus:bg-background " +
  "focus-visible:ring-0 focus-visible:ring-offset-0";

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
    <div className="bg-muted/60 space-y-2 rounded-md">
      <h3 className="text-sm font-medium">{title}</h3>

      <Input placeholder="TR" disabled />
      <Input
        className={cn(ghostInput)}
        placeholder="Код"
        value={value.code}
        onChange={(e) => onChange({ code: e.target.value })}
      />

      <div className="flex">
        <Input
          className={cn("flex-1", ghostInput)}
          placeholder="Имя"
          value={value.firstName}
          onChange={(e) => onChange({ firstName: e.target.value })}
        />

        <Input
          className={cn("flex-1", ghostInput)}
          placeholder="Фамилия"
          value={value.lastName}
          onChange={(e) => onChange({ lastName: e.target.value })}
        />
      </div>

      <div className="flex">
        <Input
          className={cn("flex-1", ghostInput)}
          placeholder="Паспорт"
          value={value.passport1}
          onChange={(e) => onChange({ passport1: e.target.value })}
        />
        <Input
          className={cn("flex-1", ghostInput)}
          placeholder="Паспорт 2"
          value={value.passport2 ?? ""}
          onChange={(e) => onChange({ passport2: e.target.value })}
        />
      </div>

      <div className="flex">
        <Input
          className={cn("flex-1", ghostInput)}
          placeholder="Город"
          value={value.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />
        <Input
          className={cn("flex-1", ghostInput)}
          placeholder="Район"
          value={value.district}
          onChange={(e) => onChange({ district: e.target.value })}
        />
      </div>

      <Input
        className={cn(ghostInput)}
        placeholder="Телефон"
        value={value.phone}
        onChange={(e) => onChange({ phone: e.target.value })}
      />
      <Input
        className={cn(ghostInput)}
        placeholder="Адрес"
        value={value.address}
        onChange={(e) => onChange({ address: e.target.value })}
      />
    </div>
  );
}
