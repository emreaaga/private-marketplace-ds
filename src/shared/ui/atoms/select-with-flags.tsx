"use client";

import { useCallback, useId, useMemo, useState } from "react";

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

type Mode = "country-only" | "country-city" | "country-city-district" | "only-cities";

type CountryCityPopoverSelectProps = {
  value: CountryCityValue;
  onChangeAction: (value: CountryCityValue) => void;
  mode?: Mode;
  fixedCountryCode?: CountryCode | null; // Для режима only-cities
  placeholder?: string;
  className?: string;
};

type Step = "country" | "city" | "district";

const ListItemButton = ({
  onClick,
  children,
  showArrow,
}: {
  onClick: () => void;
  children: React.ReactNode;
  showArrow?: boolean;
}) => (
  <Button
    type="button"
    variant="ghost"
    className="hover:bg-accent/80 group h-9 w-full justify-between rounded-lg px-2 py-1.5 text-sm font-normal"
    onClick={onClick}
  >
    {children}
    {showArrow && (
      <ChevronRight className="text-muted-foreground/0 group-hover:text-muted-foreground/50 h-3 w-3 shrink-0 transition-all" />
    )}
  </Button>
);

// eslint-disable-next-line complexity
export default function CountryCityPopoverSelect({
  value,
  onChangeAction,
  mode = "country-city",
  fixedCountryCode,
  placeholder,
  className,
}: CountryCityPopoverSelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const [internalStep, setInternalStep] = useState<Step>("country");

  const step = mode === "only-cities" || fixedCountryCode ? "city" : internalStep;

  const activeCountryCode = fixedCountryCode || value.country;
  const country = activeCountryCode ? COUNTRY_META[activeCountryCode] : null;

  const selectedCityMeta = useMemo(() => {
    if (!country || !value.city) return null;
    return Object.values(country.cities).find((c) => c.code === value.city);
  }, [country, value.city]);

  const districts = selectedCityMeta?.districts ?? [];

  const resolvedPlaceholder =
    placeholder ??
    (mode === "country-only"
      ? "Страна"
      : mode === "only-cities"
        ? "Город"
        : mode === "country-city"
          ? "Страна · Город"
          : "Страна · Город · Район");

  const resetToCountry = useCallback(() => setInternalStep("country"), []);
  const resetToCity = useCallback(() => setInternalStep("city"), []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        if (mode === "only-cities" || fixedCountryCode) {
          setInternalStep("city");
        } else if (!value.country) {
          setInternalStep("country");
        } else if (!value.city && mode !== "country-only") {
          setInternalStep("city");
        } else if (!value.district && mode === "country-city-district") {
          setInternalStep("district");
        } else {
          setInternalStep("country");
        }
      }
    },
    [mode, fixedCountryCode, value.country, value.city, value.district],
  );

  const renderCountries = () => (
    <div className="space-y-0.5">
      {(Object.entries(COUNTRY_META) as [CountryCode, (typeof COUNTRY_META)[CountryCode]][]).map(([code, meta]) => (
        <ListItemButton
          key={code}
          showArrow
          onClick={() => {
            onChangeAction({ country: code, city: null, district: null });
            if (mode === "country-only") setOpen(false);
            else setInternalStep("city");
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative h-3.5 w-4.5 shrink-0 overflow-hidden rounded-[2px] border border-black/5 bg-zinc-100 dark:bg-zinc-800">
              <Image src={meta.flag} alt="" fill className="object-cover" sizes="20px" />
            </div>
            <span className="text-foreground/90">{meta.label}</span>
          </div>
        </ListItemButton>
      ))}
    </div>
  );

  const renderCities = () => {
    if (!country) return null;
    return (
      <div className="space-y-0.5">
        {Object.values(country.cities).map((c) => (
          <ListItemButton
            key={c.code}
            showArrow={mode === "country-city-district"}
            onClick={() => {
              onChangeAction({ country: activeCountryCode as CountryCode, city: c.code, district: null });
              if (mode === "country-city-district") setInternalStep("district");
              else setOpen(false);
            }}
          >
            <span className="truncate">{c.label}</span>
          </ListItemButton>
        ))}
      </div>
    );
  };

  const renderDistricts = () => {
    if (!selectedCityMeta) return null;
    return (
      <div className="space-y-0.5">
        {districts.map((d) => (
          <Button
            key={d}
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
        ))}
      </div>
    );
  };

  const headerTitle = step === "country" ? "Выберите страну" : step === "city" ? "Выберите город" : "Выберите район";
  const showBackButton = step !== "country" && mode !== "only-cities" && !fixedCountryCode;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={mode === "only-cities" && !fixedCountryCode}
          className={cn(
            "flex w-full items-center justify-between gap-2 px-3 py-2 text-sm font-normal transition-all",
            "bg-background border-input hover:bg-accent/50 hover:border-accent-foreground/20 shadow-sm disabled:opacity-50",
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
                  {mode !== "only-cities" && `${activeCountryCode?.toUpperCase()} `}
                  {mode !== "country-only" && selectedCityMeta && (
                    <>
                      {mode !== "only-cities" && <span className="text-muted-foreground/70 mx-1">/</span>}
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
            {headerTitle}
          </span>
          {showBackButton && (
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
            {step === "country" && renderCountries()}
            {step === "city" && renderCities()}
            {step === "district" && renderDistricts()}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
