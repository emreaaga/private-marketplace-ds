import { useQuery } from "@tanstack/react-query";

import { getFlighDetailtApi } from "../api/get-flight-detail.api";

import { flightsKeys } from "./flights-keys";

export function useFlightDetails(id: number | null, enabled: boolean) {
  return useQuery({
    queryKey: flightsKeys.detail(id),
    queryFn: () => (id ? getFlighDetailtApi(id) : null),
    enabled: enabled && id !== null,
    staleTime: 5 * 60 * 1000,
  });
}
