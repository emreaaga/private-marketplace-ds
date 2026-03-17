import { type CountryCode } from "@/entities/geography";
import { api } from "@/shared/api";

import { type CompanyType } from "../model/company.types";

export type UpdateCompanyPayload = {
  name: string;
  type: CompanyType;
  location: {
    country: CountryCode | string;
    city: string;
  };
  is_active: boolean;
};

export const updateCompanyApi = async (id: number, payload: UpdateCompanyPayload): Promise<void> => {
  await api.patch(`/companies/${id}`, payload);
};
