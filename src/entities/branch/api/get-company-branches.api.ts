import { api } from "@/shared/api";

import type { Branch } from "../model/branch.model";

export const getCompanyBranchesApi = async (companyId: number, signal?: AbortSignal): Promise<Branch[]> => {
  const { data } = await api.get<{ data: Branch[] }>(`/branches/${companyId}/`, {
    signal,
  });
  return data.data;
};
