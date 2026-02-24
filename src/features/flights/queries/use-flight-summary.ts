import { useQuery } from "@tanstack/react-query";

import { flightsService } from "../api/flights";

export const useFlightSummary = (id: number) => {
  return useQuery({
    queryKey: ["flights", id, "summary"],
    queryFn: ({ signal }) => flightsService.getFlightSummary(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
