import { useQuery } from "@tanstack/react-query";

import { getShipmentDetailApi } from "../api/get-shipment-detail.api";

import { shipmentsKeys } from "./shipments.keys";

export const useShipmentDetails = (id: number | null, enabled: boolean) => {
  return useQuery({
    queryKey: shipmentsKeys.detail(id),
    queryFn: () => getShipmentDetailApi(id!),
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 5,
  });
};
