import type { CompanyType } from "@/entities/company";

export type UserStatuses = "pending" | "active" | "blocked";
export type UserRoles = "company_owner" | "employee";
export type AllUserRoles = UserRoles | "admin" | "clients";

export type User = {
  id: number;
  public_id?: string;
  company_name: string;
  company_type: CompanyType;
  name: string;
  email: string;
  role: UserRoles;
  status: UserStatuses;
  created_at: string;
};
