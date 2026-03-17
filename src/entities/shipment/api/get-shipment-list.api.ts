import { api } from "@/shared/api";

import type { Shipment } from "../model/shipment.model";
import { ShipmentStatuses } from "../model/shipment.status";

type ShipmentResponse = { data: Shipment[] };

type GetShipmentQuery = {
  company_id?: number;
  flight_id?: number;
  status?: ShipmentStatuses;
};

export const getShipmentsListApi = async (params?: GetShipmentQuery, signal?: AbortSignal) => {
  const { data } = await api.get<ShipmentResponse>("/shipments", {
    params,
    signal,
  });
  return data.data;
};
