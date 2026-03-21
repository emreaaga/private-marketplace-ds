import { CountryCode } from "@/entities/geography";
import { api } from "@/shared/api";

import { type CompanyType } from "../model/company.types";

export type CompanyOption = { id: number; name: string };

export type CompaniesLookupParams = {
  type?: CompanyType;
  country?: CountryCode;
};

export const getCompaniesLookupApi = async (
  params?: CompaniesLookupParams,
  signal?: AbortSignal,
): Promise<CompanyOption[]> => {
  const { data } = await api.get<{ data: CompanyOption[] }>("/companies/lookup", {
    params,
    signal,
  });
  return data.data;
};
