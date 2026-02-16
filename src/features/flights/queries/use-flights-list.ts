import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { flightsService, type GetFlightsPageParams } from "@/features/flights/api/flights";
import { flightsKeys } from "@/features/flights/queries/flights-keys";

export function useFlightsList(params: GetFlightsPageParams) {
  return useQuery({
    queryKey: flightsKeys.listPage(params),
    queryFn: ({ signal }) => flightsService.getFlightsPage(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
