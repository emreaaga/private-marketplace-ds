import { CountryCode } from "../geography/country.types";

import { CompanyType } from "./company.types";

export type EmployeeRole = "company_owner" | "admin" | "manager" | "employee";
export type EmployeeStatus = "active" | "inactive";

export type CompanyEmployee = {
  id: number;
  name: string;
  role: EmployeeRole | string;
  status: EmployeeStatus | string;
};

export type Company = {
  id: number;
  name: string;
  type: CompanyType;
  country: CountryCode;
  city: string;
  is_active: boolean;
  created_at: string;
};

export type CompanyDetailResponse = {
  data: Company;
  totalEmployees: number;
  employees: CompanyEmployee[];
};
