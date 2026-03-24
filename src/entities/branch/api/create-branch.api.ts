import { api } from "@/shared/api";

export type CreateBranchPayload = {
  name: string;
  location: {
    country: string;
    city: string;
  };
};

export const createBranchApi = async (companyId: number, payload: CreateBranchPayload) => {
  const { data } = await api.post(`/branches/${companyId}`, payload);
  return data;
};
