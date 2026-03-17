import { COUNTRY_META } from "./country.meta";

export type CountryCode = "tr" | "uz" | "ch";

type AllCountries = (typeof COUNTRY_META)[keyof typeof COUNTRY_META];
type AllCities = AllCountries["cities"][keyof AllCountries["cities"]];

export type CityCode = AllCities["code"];
