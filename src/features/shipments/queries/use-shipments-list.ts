import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { ShipmentsService, type GetShipmentsPageParams } from "@/features/shipments/api/shipment";
import { shipmentsKeys } from "@/features/shipments/queries/shipments.keys";

export function useShipmentsList(params: GetShipmentsPageParams) {
  return useQuery({
    queryKey: shipmentsKeys.listPage(params),
    queryFn: ({ signal }) => ShipmentsService.getShipmentsPage(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
