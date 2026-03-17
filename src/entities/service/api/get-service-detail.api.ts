import { api } from "@/shared/api";

import type { Service } from "../model/services.model";

export const getServiceDetailApi = async (id: number, signal?: AbortSignal) => {
  const { data } = await api.get<{ data: Service }>(`/services/${id}`, { signal });
  return data.data;
};
