import { api } from "@/shared/api";

import type { Service } from "../model/services.model";

import type { CreateServicePayload } from "./create-service.api";

export const updateServiceApi = async (id: number, payload: Partial<CreateServicePayload>) => {
  const { data } = await api.patch<Service>(`/services/${id}`, payload);
  return data;
};
