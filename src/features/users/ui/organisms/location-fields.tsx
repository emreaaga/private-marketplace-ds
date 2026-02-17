"use client";

import { Phone } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { Input } from "@/shared/ui/atoms/input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";
import { Textarea } from "@/shared/ui/atoms/textarea";

export type LocationErrorKey = "country" | "city" | "district" | "phone_number";

export interface LocationFieldsProps {
  location: {
    country: CountryCode | null;
    city: string | null;
    district?: string | null;
  };
  addressLine: string;
  phoneNumber: string;

  onLocationChange: (v: { country: CountryCode | null; city: string | null; district?: string | null }) => void;
  onAddressLineChange: (v: string) => void;
  onPhoneNumberChange: (v: string) => void;

  errors: Partial<Record<LocationErrorKey, string>>;
  clearError: (field: LocationErrorKey) => void;
}

// eslint-disable-next-line complexity
export function LocationFields({
  location,
  addressLine,
  phoneNumber,
  onLocationChange,
  onAddressLineChange,
  onPhoneNumberChange,
  errors,
  clearError,
}: LocationFieldsProps) {
  const countryMeta = location.country ? COUNTRY_META[location.country] : null;
  const phoneCode = countryMeta?.phoneCode ?? "";

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <CountryCityPopoverSelect
          mode="country-city-district"
          value={location}
          onChange={(newLocation) => {
            onLocationChange(newLocation);
            if (newLocation.country) clearError("country");
            if (newLocation.city) clearError("city");
          }}
          className={cn((errors.country ?? errors.city ?? errors.district) && "border-destructive ring-destructive")}
        />
        {(errors.country ?? errors.city) && (
          <p className="text-destructive px-1 text-[10px]">Проверьте правильность локации</p>
        )}
      </div>

      <Textarea
        value={addressLine}
        placeholder="Улица, дом, квартира"
        className="min-h-20 resize-none"
        onChange={(e) => onAddressLineChange(e.target.value)}
      />

      <div className="relative">
        <div className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center gap-1.5">
          {location.country && countryMeta ? (
            <span className="text-muted-foreground text-sm font-medium">{phoneCode}</span>
          ) : (
            <Phone className="text-muted-foreground h-4 w-4 opacity-60" />
          )}
        </div>

        <Input
          className={cn(
            "transition-all",
            location.country ? "pl-16" : "pl-10",
            errors.phone_number && "border-destructive focus-visible:ring-destructive",
          )}
          placeholder="000 000 00 00"
          type="tel"
          disabled={!location.country}
          value={phoneNumber}
          onChange={(e) => {
            onPhoneNumberChange(e.target.value);
            clearError("phone_number");
          }}
        />
      </div>
    </div>
  );
}
