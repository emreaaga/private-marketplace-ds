import { api } from "@/shared/api";

import { GetFlightSummaryRes } from "./types/summary-flight.res";

export const getFlightSummaryApi = async (id: number, signal?: AbortSignal): Promise<GetFlightSummaryRes> => {
  const { data } = await api.get<{ data: GetFlightSummaryRes }>(`/flights/${id}/summary`, {
    signal,
  });
  return data.data;
};
