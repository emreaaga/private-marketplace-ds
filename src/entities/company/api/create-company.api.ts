import { CountryCode } from "@/entities/geography";
import { api } from "@/shared/api";

import type { CompanyType } from "../model/company.types";

export type CreateCompanyPayload = {
  name: string;
  type: CompanyType;
  location: {
    country: CountryCode | string;
    city: string;
  };
};

export const createCompanyApi = async (payload: CreateCompanyPayload) => {
  await api.post("/companies", payload);
};
