import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { companiesService } from "@/features/companies/api/companies";
import { companiesKeys, type CompaniesListParams } from "@/features/companies/queries/companies.keys";

export function useCompaniesList(params: CompaniesListParams) {
  return useQuery({
    queryKey: companiesKeys.listPage(params),
    queryFn: ({ signal }) => companiesService.getCompaniesPage(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
