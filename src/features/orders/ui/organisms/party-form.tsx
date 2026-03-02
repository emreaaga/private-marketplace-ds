"use client";

import { Phone } from "lucide-react";

import type { ClientForm } from "@/shared/types/client/client.form";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import { CountryCode } from "@/shared/types/geography/country.types";
import { Input } from "@/shared/ui/atoms/input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

interface PartyFormProps {
  title: string;
  value: ClientForm;
  onChange: (patch: Partial<ClientForm>) => void;
}

// eslint-disable-next-line complexity
export function PartyForm({ title, value, onChange }: PartyFormProps) {
  const handleGeoChange = (geo: { country: CountryCode | null; city: string | null; district?: string | null }) => {
    const patch: Partial<ClientForm> = { ...geo };

    if (geo.country) {
      patch.phone_country_code = COUNTRY_META[geo.country].phoneCode;
    }

    onChange(patch);
  };

  const filterLetters = (val: string) => val.replace(/[^a-zA-Z]/g, "");

  const filterPassport = (val: string) => {
    const upper = val.toUpperCase();
    const letters = upper.slice(0, 2).replace(/[^A-Z]/g, "");
    const numbers = upper.slice(2).replace(/[^0-9]/g, "");
    return (letters + numbers).slice(0, 9);
  };

  return (
    <section className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between">
        <h3 className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">{title}</h3>
        <Input
          placeholder="Код"
          className="h-7 w-16 px-2 text-[11px]"
          value={value.code || ""}
          onChange={(e) => onChange({ code: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Имя"
          className="h-8 px-3 text-sm"
          value={value.firstName || ""}
          onChange={(e) => onChange({ firstName: filterLetters(e.target.value) })}
        />
        <Input
          placeholder="Фамилия"
          className="h-8 px-3 text-sm"
          value={value.lastName || ""}
          onChange={(e) => onChange({ lastName: filterLetters(e.target.value) })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Паспорт 1"
          className="h-8 px-3 text-sm"
          value={value.passports[0] || ""}
          onChange={(e) => {
            const masked = filterPassport(e.target.value);
            onChange({ passports: [masked, value.passports[1] || ""] });
          }}
        />
        <Input
          placeholder="Паспорт 2"
          className="h-8 px-3 text-sm"
          value={value.passports[1] || ""}
          onChange={(e) => {
            const masked = filterPassport(e.target.value);
            onChange({ passports: [value.passports[0] || "", masked] });
          }}
        />
      </div>

      <div className="w-full">
        <CountryCityPopoverSelect
          mode="country-city-district"
          value={{
            country: (value.country ?? null) as CountryCode,
            city: value.city ?? null,
            district: value.district ?? null,
          }}
          onChange={handleGeoChange}
          className="h-8 px-3 text-sm font-normal"
        />
      </div>

      <Input
        placeholder="Адрес доставки"
        className="h-8 px-3 text-sm"
        value={value.address || ""}
        onChange={(e) => onChange({ address: e.target.value })}
      />

      <div className="relative flex">
        <div className="bg-muted/30 border-input text-muted-foreground/50 flex items-center justify-center rounded-l-md border border-r-0 px-2.5 transition-all">
          {value.phone_country_code ? (
            <span className="text-muted-foreground text-sm font-medium">{value.phone_country_code}</span>
          ) : (
            <Phone size={14} strokeWidth={2.5} className="opacity-60" />
          )}
        </div>
        <Input
          placeholder="Номер телефона"
          inputMode="tel"
          className="h-8 rounded-l-none px-3 text-sm"
          value={value.phone_number || ""}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            onChange({ phone_number: val });
          }}
        />
      </div>
    </section>
  );
}
