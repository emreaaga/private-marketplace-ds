import { api } from "@/shared/api";

export interface BranchLookup {
  id: number;
  name: string;
  route: string;
}

export const getBranchesLookupApi = async (companyId: number, signal?: AbortSignal): Promise<BranchLookup[]> => {
  const { data } = await api.get<{ data: BranchLookup[] }>(`/branches/lookup/${companyId}`, {
    signal,
  });

  return data.data;
};
