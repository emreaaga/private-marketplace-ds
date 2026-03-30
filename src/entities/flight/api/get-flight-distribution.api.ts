import { api } from "@/shared/api";

import { FlightDistributionRes } from "./types/flight-distribution.res";

export const getFlightDistributionApi = async (id: number, signal?: AbortSignal) => {
  const { data } = await api.get<FlightDistributionRes>(`/flights/${id}/distribution`, { signal });

  return data;
};
