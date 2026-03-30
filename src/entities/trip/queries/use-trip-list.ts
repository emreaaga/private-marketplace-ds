import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTripsApi, type GetTripsParams } from "../api/get-trips.api";

import { tripsKeys } from "./trips.keys";

export function useTripsList(params: GetTripsParams) {
  return useQuery({
    queryKey: tripsKeys.list(params),
    queryFn: ({ signal }) => getTripsApi(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
