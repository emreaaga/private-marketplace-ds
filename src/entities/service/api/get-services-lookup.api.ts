import { api } from "@/shared/api";

import type { ServicePrice } from "../model/services.pricing";
import type { ServiceType } from "../model/services.types";

export type ServiceOption = { id: number; price: number };

export type GetServicesLookupParams = {
  company_id?: number;
  type?: ServiceType;
  pricing_type?: ServicePrice;
};

export const getServicesLookupApi = async (params?: GetServicesLookupParams, signal?: AbortSignal) => {
  const { data } = await api.get<{ data: ServiceOption[] }>("/services/lookup", {
    params,
    signal,
  });
  return data.data;
};
