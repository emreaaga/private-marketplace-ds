import { useQuery } from "@tanstack/react-query";

import { getFlightDistributionApi } from "../api/get-flight-distribution.api";

import { flightsKeys } from "./flights-keys";

export function useFlightDistribution(flightId: number | null) {
  return useQuery({
    queryKey: flightsKeys.distribution(flightId),
    queryFn: ({ signal }) => {
      if (!flightId) throw new Error("Flight ID is required");
      return getFlightDistributionApi(flightId, signal);
    },

    enabled: !!flightId,
    staleTime: 1 * 60 * 1000,
  });
}
