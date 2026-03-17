import { api, type PaginatedResponse } from "@/shared/api";

import type { Service } from "../model/services.model";
import type { GetServicesParams } from "../model/services.query";

export type GetServicesPar = GetServicesParams & {
  page: number;
};

export const getServicesApi = async (params: GetServicesPar, signal?: AbortSignal) => {
  const { data } = await api.get<PaginatedResponse<Service>>("/services", {
    params,
    signal,
  });
  return data;
};
