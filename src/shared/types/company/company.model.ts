import { CountryCode } from "../geography/country.types";

import { CompanyType } from "./company.types";

export type Company = {
  id: number;
  name: string;
  type: CompanyType;
  country: CountryCode;
  city: string;
  is_active: boolean;
  created_at: string;
};
