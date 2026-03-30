import { api } from "@/shared/api";

import { FlightResponse, GetFlightsLookupParams } from "./types/lookup-flight.res";

export const getFlightsLookupApi = async (params?: GetFlightsLookupParams, signal?: AbortSignal) => {
  const { data } = await api.get<{ data: FlightResponse[] }>("/flights/lookup", {
    params,
    signal,
  });
  return data.data;
};
