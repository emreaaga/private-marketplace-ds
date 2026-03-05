"use client";

import { cn } from "@/shared/lib/utils";
import type { CountryCode } from "@/shared/types/geography/country.types";
import { PhoneNumberInput } from "@/shared/ui/atoms/phone-number-input";
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
            if (newLocation.district) clearError("district");
          }}
          className={cn(
            "font-normal",
            (errors.country ?? errors.city ?? errors.district) && "border-destructive ring-destructive/20",
          )}
        />
      </div>

      <Textarea
        value={addressLine}
        placeholder="Улица, дом, квартира"
        className={cn(
          "min-h-20 resize-none text-sm font-normal shadow-sm",
          "focus-visible:ring-ring/20 focus-visible:border-ring",
        )}
        onChange={(e) => onAddressLineChange(e.target.value)}
      />

      <PhoneNumberInput
        country={location.country}
        value={phoneNumber}
        error={!!errors.phone_number}
        onChange={(v) => {
          onPhoneNumberChange(v);
          clearError("phone_number");
        }}
      />
    </div>
  );
}
