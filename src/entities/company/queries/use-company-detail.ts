import { useQuery } from "@tanstack/react-query";

import { getCompanyDetailApi, type CompanyDetailResponse } from "../api/get-company-detail.api";

import { companiesKeys } from "./companies.keys";

export function useCompanyDetail(companyId: number | null, enabled: boolean) {
  return useQuery<CompanyDetailResponse>({
    queryKey: companiesKeys.detail(companyId),
    enabled: enabled && companyId != null,
    queryFn: ({ signal }) => getCompanyDetailApi(companyId as number, signal),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
