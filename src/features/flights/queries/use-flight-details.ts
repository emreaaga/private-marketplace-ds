import { useQuery } from "@tanstack/react-query";

import { flightsService } from "@/features/flights/api/flights";

import { flightsKeys } from "./flights-keys";

export function useFlightDetails(id: number | null, enabled: boolean) {
  return useQuery({
    queryKey: flightsKeys.detail(id),
    queryFn: () => (id ? flightsService.getFlight(id) : null),
    enabled: enabled && id !== null,
    staleTime: 5 * 60 * 1000,
  });
}
