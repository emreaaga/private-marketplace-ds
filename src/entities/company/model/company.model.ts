import { CountryCode } from "@/entities/geography";

import { CompanyType } from "./company.types";

export type Company = {
  id: number;
  public_id?: string;
  name: string;
  type: CompanyType;
  country: CountryCode;
  city: string;
  is_active: boolean;
  created_at: string;
};
