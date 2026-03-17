import { AllUserRoles } from "@/entities/user";
import { api } from "@/shared/api";

import { type Company } from "../model/company.model";

export type CompanyEmployee = {
  id: number;
  name: string;
  role: AllUserRoles | string;
  status: "active" | "inactive" | string;
};

export type CompanyDetailResponse = {
  data: Company;
  totalEmployees: number;
  employees: CompanyEmployee[];
};

export const getCompanyDetailApi = async (id: number, signal?: AbortSignal): Promise<CompanyDetailResponse> => {
  const { data } = await api.get<CompanyDetailResponse>(`/companies/${id}`, { signal });
  return data;
};
