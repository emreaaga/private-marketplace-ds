import { useQuery } from "@tanstack/react-query";

import { ShipmentsService } from "@/features/shipments/api/shipment";
import type { Shipment } from "@/shared/types/shipment/shipment.model";

import { shipmentsKeys } from "./shipments.keys";

export function useDraftShipments(enabled = true) {
  return useQuery<Shipment[]>({
    queryKey: shipmentsKeys.list({ status: "draft" }),
    enabled,
    queryFn: ({ signal }) => ShipmentsService.getShipments({ status: "draft" }, signal),
    staleTime: 30_000,
    retry: 1,
  });
}
