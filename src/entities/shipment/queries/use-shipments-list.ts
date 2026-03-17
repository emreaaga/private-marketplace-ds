import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getShipmentsApi } from "../api/get-shipments.api";
import { type GetShipmentsPageParams } from "../model/shipment.dto";

import { shipmentsKeys } from "./shipments.keys";

export function useShipmentsList(params: GetShipmentsPageParams) {
  return useQuery({
    queryKey: shipmentsKeys.listPage(params),
    queryFn: ({ signal }) => getShipmentsApi(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
