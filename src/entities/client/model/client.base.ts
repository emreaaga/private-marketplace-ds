import type { CountryCode } from "@/entities/geography";

export type ClientBase = {
  firstName: string;
  lastName: string;

  country: CountryCode | null;
  city: string | null;
  district: string | null;

  phone_country_code: string;
  phone_number: string;

  address: string;
};
