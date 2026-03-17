import { useQuery } from "@tanstack/react-query";

import { getCompaniesLookupApi } from "../api/get-companies-lookup.api";

import { companiesKeys, type CompaniesLookupParams } from "./companies.keys";

export function useCompaniesLookup(params: CompaniesLookupParams & { enabled?: boolean }) {
  return useQuery({
    queryKey: companiesKeys.lookup(params),
    queryFn: ({ signal }) => getCompaniesLookupApi(params, signal),

    enabled: params.enabled !== false,

    staleTime: 5 * 60_000,
  });
}
