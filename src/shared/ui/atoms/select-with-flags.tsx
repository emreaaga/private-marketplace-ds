"use client";

import { useId, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

type City = {
  value: string;
  label: string;
};

type Country = {
  label: string;
  flag: string;
  cities: City[];
};

const countries: Record<string, Country> = {
  IN: {
    label: "Индия",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/india.png",
    cities: [
      { value: "DEL", label: "Дели" },
      { value: "BOM", label: "Мумбаи" },
    ],
  },
  CN: {
    label: "Китай",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/china.png",
    cities: [
      { value: "PEK", label: "Пекин" },
      { value: "SHA", label: "Шанхай" },
      { value: "CAN", label: "Гуанчжоу" },
    ],
  },
  MC: {
    label: "Монако",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/monaco.png",
    cities: [{ value: "MCO", label: "Монако" }],
  },
  RS: {
    label: "Сербия",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/serbia.png",
    cities: [{ value: "BEG", label: "Белград" }],
  },
  RO: {
    label: "Румыния",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/romania.png",
    cities: [{ value: "BUH", label: "Бухарест" }],
  },
  YT: {
    label: "Майотта",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/mayotte.png",
    cities: [{ value: "DZA", label: "Дзаудзи" }],
  },
  IQ: {
    label: "Ирак",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/iraq.png",
    cities: [{ value: "BGW", label: "Багдад" }],
  },
  SY: {
    label: "Сирия",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/syria.png",
    cities: [{ value: "DAM", label: "Дамаск" }],
  },
  KR: {
    label: "Корея",
    flag: "https://cdn.shadcnstudio.com/ss-assets/flags/korea.png",
    cities: [{ value: "SEL", label: "Сеул" }],
  },
};

export default function SelectWithFlagsCountryCity() {
  const id = useId();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"country" | "city">("country");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

  const selectedCountry = countryCode ? countries[countryCode] : null;

  const displayValue =
    selectedCountry && city
      ? `${selectedCountry.label} · ${city}`
      : selectedCountry
        ? selectedCountry.label
        : undefined;

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        if (step === "country") {
          setCountryCode(value);
          setStep("city");

          setOpen(false);

          setTimeout(() => setOpen(true), 0);
        } else {
          setCity(value);
          setOpen(false);
        }
      }}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder="Страна · Город">{displayValue}</SelectValue>
      </SelectTrigger>

      <SelectContent key={step}>
        {step === "country" &&
          Object.entries(countries).map(([code, country]) => (
            <SelectItem key={code} value={code}>
              <img src={country.flag} className="h-4 w-5" />
              {country.label}
            </SelectItem>
          ))}

        {step === "city" &&
          selectedCountry?.cities.map((c) => (
            <SelectItem key={c.value} value={c.label}>
              {c.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
