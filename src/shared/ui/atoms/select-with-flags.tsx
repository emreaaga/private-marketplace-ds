"use client";

import { useId, useState } from "react";

import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Button } from "@/shared/ui/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";

type CountryCityValue = {
  country: CountryCode | null;
  city: string | null;
};

type Mode = "country-only" | "country-city";

type CountryCityPopoverSelectProps = {
  value: CountryCityValue;
  onChange: (value: CountryCityValue) => void;
  mode?: Mode;
  placeholder?: string;
};

// eslint-disable-next-line complexity
export default function CountryCityPopoverSelect({
  value,
  onChange,
  mode = "country-city",
  placeholder,
}: CountryCityPopoverSelectProps) {
  const id = useId();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"country" | "city">("country");

  const country = value.country ? COUNTRY_META[value.country] : null;
  const city = country && value.city ? Object.values(country.cities).find((c) => c.code === value.city) : null;

  const resolvedPlaceholder = placeholder ?? (mode === "country-only" ? "Страна" : "Страна · Город");

  const resetToCountry = () => {
    setStep("country");
    onChange({
      country: value.country,
      city: null,
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} type="button" variant="outline" className="flex w-full items-center justify-start gap-2">
          {country ? (
            <>
              <img src={country.flag} alt="" className="h-4 w-5" />
              <span>
                {country.label}
                {mode === "country-city" && city && ` · ${city.label}`}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">{resolvedPlaceholder}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[230px] p-1">
        {step === "country" && (
          <ul className="flex flex-col">
            {(Object.entries(COUNTRY_META) as [CountryCode, (typeof COUNTRY_META)[CountryCode]][]).map(
              ([code, meta]) => (
                <li key={code}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1.5"
                    onClick={() => {
                      onChange({ country: code, city: null });

                      if (mode === "country-city") {
                        setStep("city");
                      } else {
                        setOpen(false);
                      }
                    }}
                  >
                    <img src={meta.flag} alt="" className="h-4 w-5" />
                    <span>{meta.label}</span>
                  </Button>
                </li>
              ),
            )}
          </ul>
        )}

        {mode === "country-city" && step === "city" && country && (
          <ul className="flex flex-col">
            {Object.values(country.cities).map((city) => (
              <li key={city.code}>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5"
                  onClick={() => {
                    onChange({
                      country: value.country!,
                      city: city.code,
                    });
                    setOpen(false);
                    setStep("country");
                  }}
                >
                  {city.label}
                </Button>
              </li>
            ))}

            <li className="border-t">
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground w-full justify-start text-sm"
                onClick={resetToCountry}
              >
                ← Назад
              </Button>
            </li>
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
