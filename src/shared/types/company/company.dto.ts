import { CompanyType } from "./company.types";
import { CountryCode } from "./country.types";

export type CreateCompanyPayload = {
  name: string;
  type: CompanyType;
  country: CountryCode;
  is_active: boolean;
};
