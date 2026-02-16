import { useQuery } from "@tanstack/react-query";

import { ShipmentsService, type GetShipmentsLookupParams } from "@/features/shipments/api/shipment";
import { shipmentsKeys } from "@/features/shipments/queries/shipments.keys";

export function useShipmentsLookup(params: GetShipmentsLookupParams) {
  return useQuery({
    queryKey: shipmentsKeys.lookup(params),
    queryFn: ({ signal }) => ShipmentsService.getShipmentsLookup(params, signal),
    staleTime: 5 * 60_000,
  });
}
