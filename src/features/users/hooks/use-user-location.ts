import { useState, useMemo, useCallback } from "react";

import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";

export function useUserLocation() {
  const [country, setCountry] = useState<CountryCode | "">("");
  const [city, setCity] = useState<string>(""); // city code
  const [district, setDistrict] = useState<string>("");

  const selectedCountryData = useMemo(() => {
    return country ? COUNTRY_META[country] : null;
  }, [country]);

  const selectedCityData = useMemo(() => {
    if (!selectedCountryData || !city) return null;

    return Object.values(selectedCountryData.cities).find((c) => c.code === city) ?? null;
  }, [selectedCountryData, city]);

  const phoneCode = selectedCountryData?.phoneCode ?? "+";

  const handleCountryChange = useCallback((value: CountryCode) => {
    setCountry(value);
    setCity("");
    setDistrict("");
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setCity(value);
    setDistrict("");
  }, []);

  const countryOptions = useMemo(
    () =>
      Object.entries(COUNTRY_META).map(([code, meta]) => ({
        value: code as CountryCode, // country code
        label: meta.label,
      })),
    [],
  );

  const cityOptions = useMemo(
    () =>
      selectedCountryData
        ? Object.values(selectedCountryData.cities).map((city) => ({
            value: city.code, // city CODE goes to state / API / DB
            label: city.label, // UI
          }))
        : [],
    [selectedCountryData],
  );

  const districtOptions = useMemo(
    () =>
      selectedCityData
        ? selectedCityData.districts.map((d) => ({
            value: d, // full name
            label: d,
          }))
        : [],
    [selectedCityData],
  );

  const reset = useCallback(() => {
    setCountry("");
    setCity("");
    setDistrict("");
  }, []);

  return {
    country,
    city,
    district,

    setDistrict,

    reset,

    phoneCode,

    handleCountryChange,
    handleCityChange,

    countryOptions,
    cityOptions,
    districtOptions,
  };
}
