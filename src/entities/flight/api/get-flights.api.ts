import { api, PaginatedResponse } from "@/shared/api";

import type { Flight } from "../model/flight.model";

export type GetFlightsPar = {
  page: number;
};

export const getFlightsApi = async (
  params: GetFlightsPar,
  signal?: AbortSignal,
): Promise<PaginatedResponse<Flight>> => {
  const { data } = await api.get<PaginatedResponse<Flight>>("/flights", {
    params,
    signal,
  });
  return data;
};
