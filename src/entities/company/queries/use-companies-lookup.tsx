import { useQuery } from "@tanstack/react-query";

import { CompaniesLookupParams, getCompaniesLookupApi } from "../api/get-companies-lookup.api";

import { companiesKeys } from "./companies.keys";

export function useCompaniesLookup(params: CompaniesLookupParams & { enabled?: boolean }) {
  const { enabled, ...apiParams } = params;

  return useQuery({
    queryKey: companiesKeys.lookup(apiParams),

    queryFn: ({ signal }) => getCompaniesLookupApi(apiParams, signal),

    enabled: enabled !== false,

    staleTime: 5 * 60_000,
  });
}
