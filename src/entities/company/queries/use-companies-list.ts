import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCompaniesApi } from "../api/get-companies.api";

import { companiesKeys, type CompaniesListParams } from "./companies.keys";

export function useCompaniesList(params: CompaniesListParams) {
  return useQuery({
    queryKey: companiesKeys.listPage(params),
    queryFn: ({ signal }) => getCompaniesApi(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
