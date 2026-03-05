"use client";

import { useMemo } from "react";

import { Phone } from "lucide-react";

import { cn } from "@/shared/lib/utils";
// Убираем .new
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Input } from "@/shared/ui/atoms/input";

interface PhoneNumberInputProps {
  country: CountryCode | null;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  className?: string;
}

export function PhoneNumberInput({ country, value, onChange, error, className }: PhoneNumberInputProps) {
  const phoneCode = useMemo(() => {
    if (!country) return null;

    const meta = COUNTRY_META[country];

    return meta ? meta.phoneCode.replace("+", "") : null;
  }, [country]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    onChange(digitsOnly);
  };

  const paddingLeft = useMemo(() => {
    if (!phoneCode) return "pl-10";
    const length = phoneCode.length;
    if (length === 1) return "pl-11";
    if (length === 2) return "pl-13";
    if (length === 3) return "pl-15";
    return "pl-18";
  }, [phoneCode]);

  return (
    <div className={cn("group relative w-full", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center select-none",
          "text-sm font-normal tabular-nums transition-colors",
          country ? "text-foreground" : "text-muted-foreground/40",
        )}
      >
        {phoneCode ? (
          <div className="flex items-center">
            <span className="mr-0.5 font-light opacity-40">+</span>
            <span>{phoneCode}</span>
          </div>
        ) : (
          <Phone className="h-3.5 w-3.5 transition-opacity" />
        )}
      </div>

      <Input
        type="tel"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={!country}
        placeholder={country ? "" : "Выберите страну"}
        className={cn(
          "h-10 w-full text-sm font-normal tabular-nums shadow-sm transition-all",
          "bg-background border-input hover:border-accent-foreground/20",
          "focus-visible:ring-ring/20 focus-visible:border-ring focus-visible:ring-1",
          paddingLeft,
          error && "border-destructive/50 focus-visible:ring-destructive/10 focus-visible:border-destructive",
          !country && "bg-muted/10 cursor-not-allowed opacity-60",
        )}
      />
    </div>
  );
}
