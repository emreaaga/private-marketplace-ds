import { CompanyType } from "../company/company.types";

import { ServicePrice } from "./services.pricing";
import { ServiceType } from "./services.types";

export type Service = {
  id: number;
  company_name: string;
  company_type: CompanyType;
  type: ServiceType;
  pricing_type: ServicePrice;
  price: number;
  is_active: boolean;
};
