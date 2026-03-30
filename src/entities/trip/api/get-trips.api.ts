import { api, type PaginatedResponse } from "@/shared/api";

import { GetTripsRes } from "./types/get-trips.res";

export type GetTripsParams = {
  page: number;
};

export const getTripsApi = async (params: GetTripsParams, signal?: AbortSignal) => {
  const { data } = await api.get<PaginatedResponse<GetTripsRes>>("/trips", {
    params,
    signal,
  });

  return data;
};
