"use client";

import { useId, useState } from "react";

import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Button } from "@/shared/ui/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";

type CountryCityValue = {
  country: CountryCode | null;
  city: string | null;
  district?: string | null;
};

type Mode = "country-only" | "country-city" | "country-city-district";

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
  const [step, setStep] = useState<"country" | "city" | "district">("country");

  const country = value.country ? COUNTRY_META[value.country] : null;
  const selectedCityMeta =
    country && value.city ? Object.values(country.cities).find((c) => c.code === value.city) : null;

  const districts = selectedCityMeta?.districts ?? [];

  const resolvedPlaceholder = placeholder ?? (mode === "country-only" ? "Страна" : "Страна · Город");

  const resetToCountry = () => {
    setStep("country");
    onChange({
      country: value.country,
      city: null,
      district: null,
    });
  };

  const resetToCity = () => {
    setStep("city");
    onChange({
      country: value.country,
      city: value.city,
      district: null,
    });
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);

        if (next) {
          if (mode === "country-only") {
            setStep("country");
          } else if (!value.country) {
            setStep("country");
          } else if (!value.city) {
            setStep("city");
          } else if (mode === "country-city-district") {
            setStep("district");
          } else {
            setStep("country");
          }
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button id={id} type="button" variant="outline" className="flex w-full items-center justify-start gap-2">
          {country ? (
            <>
              <img src={country.flag} alt="" className="h-4 w-5" />
              <span>
                {country.label}

                {mode !== "country-only" && selectedCityMeta && (
                  <>
                    {" · "}
                    {selectedCityMeta.label}
                  </>
                )}

                {mode === "country-city-district" && value.district && (
                  <>
                    {" · "}
                    {value.district}
                  </>
                )}
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
                      onChange({ country: code, city: null, district: null });

                      if (mode === "country-only") {
                        setOpen(false);
                      } else {
                        setStep("city");
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

        {mode !== "country-only" && step === "city" && country && (
          <ul className="flex flex-col">
            {Object.values(country.cities).map((c) => (
              <li key={c.code}>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5"
                  onClick={() => {
                    onChange({
                      country: value.country!,
                      city: c.code,
                      district: null,
                    });

                    if (mode === "country-city-district") {
                      setStep("district");
                    } else {
                      setOpen(false);
                      setStep("country");
                    }
                  }}
                >
                  {c.label}
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

        {mode === "country-city-district" && step === "district" && country && selectedCityMeta && (
          <ul className="flex flex-col">
            {districts.map((d) => (
              <li key={d}>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5"
                  onClick={() => {
                    onChange({
                      country: value.country!,
                      city: value.city!,
                      district: d,
                    });

                    setOpen(false);
                    setStep("country");
                  }}
                >
                  {d}
                </Button>
              </li>
            ))}

            <li className="border-t">
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground w-full justify-start text-sm"
                onClick={resetToCity}
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
