import { api } from "@/shared/api";

import { DetailFlightRequest } from "./types/detail-flight.req";

export const getFlighDetailtApi = async (id: number, signal?: AbortSignal): Promise<DetailFlightRequest> => {
  const { data } = await api.get<{ data: DetailFlightRequest }>(`/flights/${id}`, {
    signal,
  });
  return data.data;
};
