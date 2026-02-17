"use client";

import { api } from "@/shared/lib/api";
import type { CreateCompanyPayload } from "@/shared/types/company/company.dto";
import type { Company } from "@/shared/types/company/company.model";
import type { CompanyType } from "@/shared/types/company/company.types";
import type { PaginatedResponse } from "@/shared/types/paginated-response";

export type CompanyOption = { id: number; name: string };

type GetCompaniesPageParams = {
  page: number;
  type?: CompanyType;
};

type GetCompaniesLookupParams = {
  type?: CompanyType;
};

export type UpdateCompanyPayload = {
  name: string;
  type: CompanyType;
  country: string;
  city: string;
  is_active: boolean;
};

export const companiesService = {
  async createCompany(payload: CreateCompanyPayload): Promise<Company> {
    const { data } = await api.post("/companies", payload);
    return data.company;
  },

  async getCompaniesPage(params: GetCompaniesPageParams, signal?: AbortSignal): Promise<PaginatedResponse<Company>> {
    const { data } = await api.get<PaginatedResponse<Company>>("/companies", {
      params: { page: params.page, type: params.type },
      signal,
    });

    return data;
  },

  async getCompany(id: number, signal?: AbortSignal): Promise<Company> {
    const { data } = await api.get<{ data: Company }>(`/companies/${id}`, { signal });
    return data.data;
  },

  async updateCompany(id: number, payload: UpdateCompanyPayload): Promise<Company> {
    const { data } = await api.patch<{ data: Company }>(`/companies/${id}`, payload);
    return data.data;
  },

  async getCompaniesLookup(params?: GetCompaniesLookupParams, signal?: AbortSignal): Promise<CompanyOption[]> {
    const { data } = await api.get<{ data: CompanyOption[] }>("/companies/lookup", {
      params: params?.type ? { type: params.type } : undefined,
      signal,
    });

    return data.data;
  },
};
