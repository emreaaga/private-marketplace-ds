import { useQuery } from "@tanstack/react-query";

import { ShipmentsService } from "../api/shipment";

import { shipmentsKeys } from "./shipments.keys";

export const useShipmentDetails = (id: number | null, enabled: boolean) => {
  return useQuery({
    queryKey: shipmentsKeys.detail(id),
    queryFn: () => ShipmentsService.getById(id!),
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 5,
  });
};
