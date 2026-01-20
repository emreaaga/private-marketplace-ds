import { CompanyType } from "./company.types";
import { CountryCode } from "./country.types";

export type Company = {
  id: number;
  name: string;
  type: CompanyType;
  country: CountryCode;
  is_active: boolean;
  created_at: string;
};
