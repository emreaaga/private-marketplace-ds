import { api, type PaginatedResponse } from "@/shared/api";

import type { Company } from "../model/company.model";
import type { CompanyType } from "../model/company.types";

export type GetCompaniesParams = {
  page: number;
  type?: CompanyType;
};

export const getCompaniesApi = async (
  params: GetCompaniesParams,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Company>> => {
  const { data } = await api.get<PaginatedResponse<Company>>("/companies", {
    params: { page: params.page, type: params.type },
    signal,
  });
  return data;
};
