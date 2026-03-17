import { type AllCompanyType } from "@/entities/company";

import { AllUserRoles } from "./user.model";

export type UserAuth = {
  id: string;
  name: string;
  role: AllUserRoles;
  company_id: number;
  company_name: string;
  company_type: AllCompanyType;
};
