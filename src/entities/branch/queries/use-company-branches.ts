import { useQuery } from "@tanstack/react-query";

import { getCompanyBranchesApi } from "../api/get-company-branches.api";

import { branchesKeys } from "./branches.keys";

export function useCompanyBranches(companyId: number | null) {
  return useQuery({
    queryKey: branchesKeys.byCompany(companyId!),
    queryFn: ({ signal }) => getCompanyBranchesApi(companyId!, signal),

    enabled: companyId !== null,
    staleTime: 60_000,
  });
}
