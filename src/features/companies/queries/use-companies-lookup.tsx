import { useQuery } from "@tanstack/react-query";

import { companiesService } from "@/features/companies/api/companies";
import { companiesKeys, type CompaniesLookupParams } from "@/features/companies/queries/companies.keys";

export function useCompaniesLookup(params: CompaniesLookupParams) {
  return useQuery({
    queryKey: companiesKeys.lookup(params),
    queryFn: ({ signal }) => companiesService.getCompaniesLookup(params, signal),

    staleTime: 5 * 60_000,
  });
}
