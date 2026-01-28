import { CountryCode } from "../geography/country.types";

import { CompanyType } from "./company.types";

export type CreateCompanyPayload = {
  name: string;
  type: CompanyType;
  country: CountryCode;
  city: string;
};
