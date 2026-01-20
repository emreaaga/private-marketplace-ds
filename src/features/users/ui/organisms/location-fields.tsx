import { Phone } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { CountryCode } from "@/shared/types/company/country.types";
import { Input } from "@/shared/ui/atoms/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";
import { Textarea } from "@/shared/ui/atoms/textarea";

export type LocationErrorKey = "country" | "city" | "district" | "phone_number";

interface Option<T = string> {
  value: T;
  label: string;
}

export interface LocationFieldsProps {
  country: CountryCode | "";
  city: string;
  district: string;

  addressLine: string;
  phoneNumber: string;

  countryOptions: Option<CountryCode>[];
  cityOptions: Option<string>[];
  districtOptions: Option<string>[];

  phoneCode: string;

  onCountryChange: (v: CountryCode) => void;
  onCityChange: (v: string) => void;
  onDistrictChange: (v: string) => void;
  onAddressLineChange: (v: string) => void;
  onPhoneNumberChange: (v: string) => void;

  errors: Partial<Record<LocationErrorKey, string>>;
  clearError: (field: LocationErrorKey) => void;
}

export function LocationFields({
  country,
  city,
  district,
  addressLine,
  phoneNumber,
  countryOptions,
  cityOptions,
  districtOptions,
  phoneCode,
  onCountryChange,
  onCityChange,
  onDistrictChange,
  onAddressLineChange,
  onPhoneNumberChange,
  errors,
  clearError,
}: LocationFieldsProps) {
  return (
    <div className="space-y-2">
      <Select
        value={country}
        onValueChange={(v) => {
          onCountryChange(v as CountryCode);
          clearError("country");
        }}
      >
        <SelectTrigger className={cn("w-full", errors.country && "border-destructive")}>
          <SelectValue placeholder="Страна" />
        </SelectTrigger>
        <SelectContent>
          {countryOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={city}
        disabled={!country}
        onValueChange={(v) => {
          onCityChange(v);
          clearError("city");
        }}
      >
        <SelectTrigger className={cn("w-full", errors.city && "border-destructive")}>
          <SelectValue placeholder="Город" />
        </SelectTrigger>
        <SelectContent>
          {cityOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={district}
        disabled={!city}
        onValueChange={(v) => {
          onDistrictChange(v);
          clearError("district");
        }}
      >
        <SelectTrigger className={cn("w-full", errors.district && "border-destructive")}>
          <SelectValue placeholder="Район" />
        </SelectTrigger>
        <SelectContent>
          {districtOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        value={addressLine}
        placeholder="Улица, дом, квартира"
        onChange={(e) => onAddressLineChange(e.target.value)}
      />

      <div className="relative">
        <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
          {country ? phoneCode : <Phone className="h-4 w-4 opacity-60" />}
        </span>

        <Input
          className={cn("pl-14", errors.phone_number && "border-destructive")}
          placeholder="Номер телефона"
          disabled={!country}
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
