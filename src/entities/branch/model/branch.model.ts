import { CityCode, CountryCode } from "@/entities/geography";

export type Branch = {
  id: number;
  company_id: number;

  name: string;
  country: CountryCode;
  city: CityCode;

  is_main: boolean;
  is_active: boolean;
};
