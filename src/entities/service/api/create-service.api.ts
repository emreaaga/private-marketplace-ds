import { api } from "@/shared/api";

import type { Service } from "../model/services.model";
import type { ServicePrice } from "../model/services.pricing";
import type { ServiceType } from "../model/services.types";

export type CreateServicePayload = {
  company_id: number;
  type: ServiceType;
  pricing_type: ServicePrice;
  price: string;
};

export const createServiceApi = async (payload: CreateServicePayload) => {
  const { data } = await api.post<Service>("/services", payload);
  return data;
};
