"use client";

import { Phone } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { ClientForm } from "@/shared/types/client/client.form";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import { Input } from "@/shared/ui/atoms/input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

export function PartyFields({
  title,
  value,
  onChangeAction,
  readOnly = false, // <-- Добавили флаг
}: {
  title: string;
  value: ClientForm;
  onChangeAction?: (patch: Partial<ClientForm>) => void; // Сделали опциональным
  readOnly?: boolean;
}) {
  const phoneCode = value.country ? COUNTRY_META[value.country].phoneCode : null;

  return (
    <section className="bg-background space-y-2 p-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{title}</h3>

        <Input
          className="h-6 w-30 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Код клиента"
          value={value.code}
          onChange={(e) => onChangeAction?.({ code: e.target.value })}
          disabled={readOnly}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          className="h-9 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Имя"
          value={value.firstName}
          onChange={(e) => onChangeAction?.({ firstName: e.target.value })}
          disabled={readOnly}
        />
        <Input
          className="h-9 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Фамилия"
          value={value.lastName}
          onChange={(e) => onChangeAction?.({ lastName: e.target.value })}
          disabled={readOnly}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          className="h-9 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Паспорт"
          value={value.passports[0] ?? ""}
          onChange={(e) =>
            onChangeAction?.({
              passports: [e.target.value, value.passports[1] ?? ""],
            })
          }
          disabled={readOnly}
        />

        <Input
          className="h-9 disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Паспорт 2"
          value={value.passports[1] ?? ""}
          onChange={(e) =>
            onChangeAction?.({
              passports: [value.passports[0] ?? "", e.target.value],
            })
          }
          disabled={readOnly}
        />
      </div>

      <CountryCityPopoverSelect
        mode="country-city-district"
        value={{ country: value.country, city: value.city, district: value.district }}
        onChange={({ country, city, district }) => {
          const nextPhoneCode = country ? COUNTRY_META[country].phoneCode : "";

          onChangeAction?.({
            country,
            city,
            district,
            phone_country_code: nextPhoneCode,
          });
        }}
      />

      <Input
        className="h-9 disabled:cursor-not-allowed disabled:opacity-70"
        placeholder="Адрес"
        value={value.address}
        onChange={(e) => onChangeAction?.({ address: e.target.value })}
        disabled={readOnly}
      />

      <div className="relative">
        <span
          className={cn(
            "text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 text-sm",
            readOnly && "opacity-60",
          )}
        >
          {phoneCode ?? <Phone className="h-4 w-4 opacity-60" />}
        </span>

        <Input
          className={cn("h-9 pl-12 disabled:cursor-not-allowed disabled:opacity-70")}
          placeholder="Номер телефона"
          disabled={readOnly || !value.country}
          value={value.phone_number}
          onChange={(e) => onChangeAction?.({ phone_number: e.target.value })}
          inputMode="tel"
        />
      </div>
    </section>
  );
}
