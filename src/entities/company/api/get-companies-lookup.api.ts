import { api } from "@/shared/api";

import { type CompanyType } from "../model/company.types";

export type CompanyOption = { id: number; name: string };

type GetCompaniesLookupParams = {
  type?: CompanyType;
};

export const getCompaniesLookupApi = async (
  params?: GetCompaniesLookupParams,
  signal?: AbortSignal,
): Promise<CompanyOption[]> => {
  const { data } = await api.get<{ data: CompanyOption[] }>("/companies/lookup", {
    params: params?.type ? { type: params.type } : undefined,
    signal,
  });
  return data.data;
};
