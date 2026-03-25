import { useQuery } from "@tanstack/react-query";

import { getBranchesLookupApi } from "../api/get-branches-lookup.api";

import { branchesKeys } from "./branches.keys";

interface UseBranchesLookupParams {
  companyId?: number | null;
  enabled?: boolean;
}

export function useBranchesLookup({ companyId, enabled = true }: UseBranchesLookupParams) {
  return useQuery({
    queryKey: branchesKeys.lookups(companyId ?? undefined),
    queryFn: ({ signal }) => getBranchesLookupApi(companyId!, signal),

    enabled: enabled && !!companyId,
    staleTime: 5 * 60 * 1000,
  });
}
