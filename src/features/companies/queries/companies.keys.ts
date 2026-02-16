import type { CompanyType } from "@/shared/types/company/company.types";

export type CompaniesListParams = {
  page: number;
  type?: CompanyType;
};

export type CompaniesLookupParams = {
  type?: CompanyType;
};

export const companiesKeys = {
  all: ["companies"] as const,

  lists: () => [...companiesKeys.all, "list"] as const,

  listPage: (params: CompaniesListParams) => [...companiesKeys.lists(), "page", params] as const,

  lookup: (params: CompaniesLookupParams) => [...companiesKeys.lists(), "lookup", params] as const,

  details: () => [...companiesKeys.all, "detail"] as const,
  detail: (id: number | null) => [...companiesKeys.details(), id] as const,
};
