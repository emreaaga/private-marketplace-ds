import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getFlightsApi, type GetFlightsPar } from "../api/get-flights.api";

import { flightsKeys } from "./flights-keys";

export function useFlightsList(params: GetFlightsPar) {
  return useQuery({
    queryKey: flightsKeys.listPage(params),
    queryFn: ({ signal }) => getFlightsApi(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
