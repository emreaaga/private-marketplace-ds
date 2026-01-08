"use client";

import { useId, useState } from "react";

import { countries } from "@/shared/countries-cities";
import { Button } from "@/shared/ui/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";

export default function CountryCityPopoverSelect() {
  const id = useId();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"country" | "city">("country");

  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [cityCode, setCityCode] = useState<string | null>(null);

  const selectedCountry = countryCode ? countries[countryCode] : null;
  const selectedCity = selectedCountry?.cities.find((c) => c.value === cityCode) ?? null;

  const reset = () => {
    setStep("country");
    setCountryCode(null);
    setCityCode(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button id={id} type="button" variant="outline" className="flex w-full items-center justify-start">
          {selectedCountry && selectedCity ? (
            <>
              <img src={selectedCountry.flag} alt="" className="h-4 w-5" />
              <span>
                {selectedCountry.label} · {selectedCity.label}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Страна · Город</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[230px] p-1">
        {step === "country" && (
          <ul className="flex flex-col">
            {Object.entries(countries).map(([code, country]) => (
              <li key={code}>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 py-1.5"
                  onClick={() => {
                    setCountryCode(code);
                    setStep("city");
                  }}
                >
                  <img src={country.flag} alt="" className="h-4 w-5" />
                  <span>{country.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        )}

        {step === "city" && selectedCountry && (
          <ul className="flex flex-col">
            {selectedCountry.cities.map((city) => (
              <li key={city.value}>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5"
                  onClick={() => {
                    setCityCode(city.value);
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
                onClick={reset}
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
