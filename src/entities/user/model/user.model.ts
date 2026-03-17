import type { CompanyType } from "@/entities/company";

export type UserStatuses = "pending" | "active" | "blocked";
export type UserRoles = "company_owner" | "employee" | "courier" | "seller";
export type AllUserRoles = UserRoles | "admin";

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
