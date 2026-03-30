import { useQuery } from "@tanstack/react-query";

import { getFlightsLookupApi } from "../api/lookup-flight.api";

import { flightsKeys } from "./flights-keys";

export function useFlightsLookup() {
  return useQuery({
    queryKey: flightsKeys.lookups(),
    queryFn: ({ signal }) => getFlightsLookupApi({}, signal),
    staleTime: 5 * 60 * 1000,
  });
}
