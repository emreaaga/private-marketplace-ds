"use client";

import { useId, useMemo, useState } from "react";

import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { COUNTRY_META, type CountryCode } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/atoms/popover";

import { ScrollArea } from "./scroll-area";

type CountryCityValue = {
  country: CountryCode | null;
  city: string | null;
  district?: string | null;
};

type Mode = "country-only" | "country-city" | "country-city-district";

type CountryCityPopoverSelectProps = {
  value: CountryCityValue;
  onChangeAction: (value: CountryCityValue) => void;
  mode?: Mode;
  placeholder?: string;
  className?: string;
};

// eslint-disable-next-line complexity
export default function CountryCityPopoverSelect({
  value,
  onChangeAction,
  mode = "country-city",
  placeholder,
  className,
}: CountryCityPopoverSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"country" | "city" | "district">("country");

  const country = value.country ? COUNTRY_META[value.country] : null;

  const selectedCityMeta = useMemo(() => {
    if (!country || !value.city) return null;
    return Object.values(country.cities).find((c) => c.code === value.city);
  }, [country, value.city]);

  const districts = selectedCityMeta?.districts ?? [];

  const resolvedPlaceholder =
    placeholder ??
    (mode === "country-only" ? "Страна" : mode === "country-city" ? "Страна · Город" : "Страна · Город · Район");

  const resetToCountry = () => setStep("country");
  const resetToCity = () => setStep("city");

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          if (!value.country) setStep("country");
          else if (!value.city && mode !== "country-only") setStep("city");
          else if (!value.district && mode === "country-city-district") setStep("district");
          else setStep("country");
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn(
            "flex w-full items-center justify-between gap-2 px-3 py-2 text-sm font-normal transition-all",
            "bg-background border-input hover:bg-accent/50 hover:border-accent-foreground/20 shadow-sm",
            className,
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {country ? (
              <>
                <div className="relative h-3.5 w-4.5 shrink-0 overflow-hidden rounded-[2px] border border-black/5 bg-zinc-100 dark:bg-zinc-800">
                  <Image src={country.flag} alt="" fill className="object-cover" sizes="20px" />
                </div>
                <span className="truncate">
                  {value.country?.toUpperCase()}

                  {mode !== "country-only" && selectedCityMeta && (
                    <>
                      <span className="text-muted-foreground/70 mx-1">/</span>

                      {selectedCityMeta.code.toUpperCase()}
                    </>
                  )}

                  {mode === "country-city-district" && value.district && (
                    <>
                      <span className="text-muted-foreground/70 mx-1">/</span>
                      {value.district}
                    </>
                  )}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground/60">{resolvedPlaceholder}</span>
            )}
          </div>
          <ChevronRight
            className={cn("text-muted-foreground/50 h-3.5 w-3.5 transition-transform", open && "rotate-90")}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="border-muted/40 flex max-h-100 w-60 flex-col overflow-hidden rounded-xl p-0 shadow-xl"
        align="start"
      >
        {/* HEADER */}
        <div className="bg-muted/20 flex shrink-0 items-center justify-between border-b px-3 py-2">
          <span className="text-muted-foreground/80 text-[11px] font-medium tracking-wider uppercase">
            {step === "country" ? "Выберите страну" : step === "city" ? "Выберите город" : "Выберите район"}
          </span>
          {step !== "country" && (
            <button
              onClick={step === "city" ? resetToCountry : resetToCity}
              className="hover:bg-muted rounded-md p-1 transition-colors"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
          )}
        </div>

        <ScrollArea className="w-full flex-1 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
          <div
            key={step}
            className="animate-in fade-in-0 slide-in-from-bottom-1 flex flex-col p-1 pr-3 duration-200 ease-out"
          >
            {step === "country" && (
              <ul className="space-y-0.5">
                {(Object.entries(COUNTRY_META) as [CountryCode, (typeof COUNTRY_META)[CountryCode]][]).map(
                  ([code, meta]) => (
                    <li key={code}>
                      <Button
                        type="button"
                        variant="ghost"
                        className="hover:bg-accent/80 group h-9 w-full justify-between rounded-lg px-2 py-1.5 text-sm font-normal"
                        onClick={() => {
                          onChangeAction({ country: code, city: null, district: null });
                          if (mode === "country-only") setOpen(false);
                          else setStep("city");
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="relative h-3.5 w-4.5 shrink-0 overflow-hidden rounded-[2px] border border-black/5 bg-zinc-100 dark:bg-zinc-800">
                            <Image src={meta.flag} alt="" fill className="object-cover" sizes="20px" />
                          </div>
                          <span className="text-foreground/90">{meta.label}</span>
                        </div>
                        <ChevronRight className="text-muted-foreground/0 group-hover:text-muted-foreground/50 h-3 w-3 transition-all" />
                      </Button>
                    </li>
                  ),
                )}
              </ul>
            )}

            {mode !== "country-only" && step === "city" && country && (
              <ul className="space-y-0.5">
                {Object.values(country.cities).map((c) => (
                  <li key={c.code}>
                    <Button
                      type="button"
                      variant="ghost"
                      className="hover:bg-accent/80 group h-9 w-full justify-between rounded-lg px-2 py-1.5 text-sm font-normal"
                      onClick={() => {
                        onChangeAction({ ...value, city: c.code, district: null });
                        if (mode === "country-city-district") setStep("district");
                        else setOpen(false);
                      }}
                    >
                      <span className="truncate">{c.label}</span>
                      <ChevronRight className="text-muted-foreground/0 group-hover:text-muted-foreground/50 h-3 w-3 shrink-0 transition-all" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            {mode === "country-city-district" && step === "district" && country && selectedCityMeta && (
              <ul className="space-y-0.5">
                {districts.map((d) => (
                  <li key={d}>
                    <Button
                      type="button"
                      variant="ghost"
                      className="hover:bg-accent/80 h-9 w-full justify-start rounded-lg px-2 py-1.5 text-sm font-normal"
                      onClick={() => {
                        onChangeAction({ ...value, district: d });
                        setOpen(false);
                      }}
                    >
                      <span className="truncate">{d}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
