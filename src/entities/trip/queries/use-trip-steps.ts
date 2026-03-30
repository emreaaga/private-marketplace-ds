import { useQuery } from "@tanstack/react-query";

import { getTripStopsApi } from "../api/get-trip-stops.api";

import { tripsKeys } from "./trips.keys";

export function useTripStops(tripId: number) {
  return useQuery({
    queryKey: tripsKeys.stops(tripId),
    queryFn: ({ signal }) => getTripStopsApi(tripId, signal),

    enabled: !!tripId,
    staleTime: 60_000,
  });
}
