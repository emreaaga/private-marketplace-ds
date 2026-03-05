"use client";

import { useCallback, useMemo, useState } from "react";

import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";

export function useUserLocation() {
  const [country, setCountry] = useState<CountryCode | "">("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");

  const selectedCountryData = useMemo(() => {
    if (!country) return null;
    return COUNTRY_META[country as CountryCode] ?? null;
  }, [country]);

  const selectedCityData = useMemo(() => {
    if (!selectedCountryData || !city) return null;

    return Object.values(selectedCountryData.cities).find((c) => c.code === city) ?? null;
  }, [selectedCountryData, city]);

  const phoneCode = selectedCountryData?.phoneCode ?? "+";

  const handleCountryChange = useCallback((value: CountryCode | "") => {
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
        value: code as CountryCode,
        label: meta.label,
      })),
    [],
  );

  const cityOptions = useMemo(
    () =>
      selectedCountryData
        ? Object.values(selectedCountryData.cities).map((city) => ({
            value: city.code,
            label: city.label,
          }))
        : [],
    [selectedCountryData],
  );

  const districtOptions = useMemo(
    () =>
      selectedCityData
        ? selectedCityData.districts.map((d) => ({
            value: d,
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

    handleCountryChange,
    handleCityChange,
    reset,

    phoneCode,
    selectedCountryData,
    selectedCityData,

    countryOptions,
    cityOptions,
    districtOptions,
  };
}
