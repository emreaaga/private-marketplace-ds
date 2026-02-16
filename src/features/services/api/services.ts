"use client";

import { api } from "@/shared/lib/api";
import type { PaginatedResponse } from "@/shared/types/paginated-response";
import type { CreateServicePayload } from "@/shared/types/services/services.dto";
import type { Service } from "@/shared/types/services/services.model";
import type { ServicePrice } from "@/shared/types/services/services.pricing";
import type { GetServicesParams } from "@/shared/types/services/services.query";
import { ServiceType } from "@/shared/types/services/services.types";

export type ServiceOption = { id: number; price: number };

type GetServicesPageParams = GetServicesParams & {
  page: number;
};

export type GetServicesLookupParams = {
  company_id?: number;
  type?: ServiceType;
  pricing_type?: ServicePrice;
};

export const servicesService = {
  async getServicesPage(params: GetServicesPageParams, signal?: AbortSignal): Promise<PaginatedResponse<Service>> {
    const { data } = await api.get<PaginatedResponse<Service>>("/services", {
      params,
      signal,
    });

    return data;
  },

  async getServicesLookup(params?: GetServicesLookupParams, signal?: AbortSignal): Promise<ServiceOption[]> {
    const { data } = await api.get<{ data: ServiceOption[] }>("/services/lookup", {
      params,
      signal,
    });

    return data.data;
  },

  async createService(payload: CreateServicePayload): Promise<Service> {
    const { data } = await api.post("/services", payload);
    return data;
  },
};
