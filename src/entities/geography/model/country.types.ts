import { COUNTRY_META } from "./country.meta";

export type CountryCode = keyof typeof COUNTRY_META;

export type CityCode = {
  [K in CountryCode]: (typeof COUNTRY_META)[K]["cities"][keyof (typeof COUNTRY_META)[K]["cities"]]["code"];
}[CountryCode];

export const COUNTRY_CODES = Object.keys(COUNTRY_META) as [CountryCode, ...CountryCode[]];

export const CITY_CODES = Object.values(COUNTRY_META).flatMap((country) =>
  Object.values(country.cities).map((city) => city.code),
) as [CityCode, ...CityCode[]];
