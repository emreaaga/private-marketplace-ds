import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBranchApi, type CreateBranchPayload } from "../api/create-branch.api";

import { branchesKeys } from "./branches.keys";

export function useCreateBranch(companyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBranchPayload) => createBranchApi(companyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: branchesKeys.byCompany(companyId),
      });
    },
  });
}
