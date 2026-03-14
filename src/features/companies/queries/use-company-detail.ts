import { useQuery } from "@tanstack/react-query";

import { companiesService } from "@/features/companies/api/companies";
import { companiesKeys } from "@/features/companies/queries/companies.keys";
import type { CompanyDetailResponse } from "@/shared/types/company/company.model";

export function useCompanyDetail(companyId: number | null, enabled: boolean) {
  return useQuery<CompanyDetailResponse>({
    queryKey: companiesKeys.detail(companyId),
    enabled: enabled && companyId != null,
    queryFn: ({ signal }) => companiesService.getCompany(companyId as number, signal),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
