import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { shipmentsService, type GetShipmentsPageParams } from "@/features/shipments/api/shipments.server";
import { shipmentsKeys } from "@/features/shipments/queries/flight-shipments/shipments.keys";

export function useShipmentsList(params: GetShipmentsPageParams) {
  return useQuery({
    queryKey: shipmentsKeys.listPage(params),
    queryFn: ({ signal }) => shipmentsService.getShipmentsPage(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
