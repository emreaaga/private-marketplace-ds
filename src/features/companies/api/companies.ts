import { api } from "@/shared/lib/api";
import type { CreateCompanyPayload } from "@/shared/types/company/company.dto";
import type { Company } from "@/shared/types/company/company.model";

export const companiesService = {
  async createCompany(payload: CreateCompanyPayload): Promise<Company> {
    const { data } = await api.post("/companies", payload);
    return data.company;
  },

  async getCompanies(): Promise<Company[]> {
    const { data } = await api.get("/companies");
    return data;
  },
};
