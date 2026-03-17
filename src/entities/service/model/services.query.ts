import type { ServicePrice } from "./services.pricing";
import type { ServiceType } from "./services.types";

export type GetServicesParams = {
  company_id?: number;
  type?: ServiceType;
  pricing_type?: ServicePrice;
};
