import { api } from "@/shared/api";

import type { Service } from "../model/services.model";

export type CreateServicePayload = {
  company_id: number;
  type: Service["type"];
  pricing_type: Service["pricing_type"];
  price: number;
};

export const createServiceApi = async (payload: CreateServicePayload) => {
  const { data } = await api.post<Service>("/services", payload);
  return data;
};
