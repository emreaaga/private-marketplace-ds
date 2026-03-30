import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTripStopOrdersApi } from "../api/get-trip-stop-orders.api";

import { tripsKeys } from "./trips.keys";

export function useTripStopOrders(tripId: number, branchId: number, page: number) {
  return useQuery({
    queryKey: [...tripsKeys.stopOrders(tripId, branchId), { page }],
    queryFn: ({ signal }) => getTripStopOrdersApi(tripId, branchId, { page }, signal),

    enabled: !!tripId && !!branchId,

    placeholderData: keepPreviousData,

    staleTime: 30_000,
  });
}
