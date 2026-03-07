import { AllCompanyType } from "@/shared/types/company/company.types";
import { AllUserRoles } from "@/shared/types/users";

export type UserAuth = {
  id: string;
  name: string;
  role: AllUserRoles;
  company_id: number;
  company_name: string;
  company_type: AllCompanyType;
};
