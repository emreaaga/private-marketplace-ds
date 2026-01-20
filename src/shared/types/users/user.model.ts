import type { CompanyType } from "../company/company.types";

export type UserStatuses = "pending" | "active" | "blocked";
export type UserRoles = "company_owner" | "admin" | "employee" | "courier" | "seller";

export type User = {
  id: number;
  company_name: string;
  company_type: CompanyType;
  name: string;
  email: string;
  role: UserRoles;
  status: UserStatuses;
  created_at: string;
};
