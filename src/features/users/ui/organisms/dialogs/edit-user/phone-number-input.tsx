"use client";

import { Phone } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Input } from "@/shared/ui/atoms/input";

export function PhoneNumberInput({
  country,
  value,
  onChange,
  error,
}: {
  country: CountryCode | null;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}) {
  const phoneCode = country ? COUNTRY_META[country].phoneCode : null;

  return (
    <div className="relative">
      <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
        {country ? phoneCode : <Phone className="h-4 w-4 opacity-60" />}
      </span>

      <Input
        className={cn("pl-14", error && "border-destructive focus-visible:ring-destructive")}
        placeholder="Номер телефона"
        disabled={!country}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
