import { useQuery } from "@tanstack/react-query";

import { getFlightSummaryApi } from "../api/get-flight-summary.api";

export const useFlightSummary = (id: number) => {
  return useQuery({
    queryKey: ["flights", id, "summary"],
    queryFn: ({ signal }) => getFlightSummaryApi(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
