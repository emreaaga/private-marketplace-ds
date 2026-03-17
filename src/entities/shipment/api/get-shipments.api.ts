import { api, type PaginatedResponse } from "@/shared/api";

import type { Shipment } from "../model/shipment.model";
import { ShipmentStatuses } from "../model/shipment.status";

type GetShipmentQuery = {
  company_id?: number;
  flight_id?: number;
  status?: ShipmentStatuses;
};

type GetShipmentsParams = GetShipmentQuery & {
  page: number;
};

export const getShipmentsApi = async (params: GetShipmentsParams, signal?: AbortSignal) => {
  const { data } = await api.get<PaginatedResponse<Shipment>>("/shipments", {
    params,
    signal,
  });
  return data;
};
