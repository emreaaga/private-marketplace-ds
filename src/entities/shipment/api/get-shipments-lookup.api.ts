import { api } from "@/shared/api";

import { ShipmentStatuses } from "../model/shipment.status";

type GetShipmentQuery = {
  company_id?: number;
  flight_id?: number;
  status?: ShipmentStatuses;
};

type ShipmentOption = {
  id: number;
  number: string;
  orders_count: string;
  total_weight_kg: string;
  total_prepaid: string;
  total_remaining: string;
};

type GetShipmentsLookupParams = GetShipmentQuery & {
  q?: string;
  limit?: number;
};

export const getShipmentsLookupApi = async (params?: GetShipmentsLookupParams, signal?: AbortSignal) => {
  const { data } = await api.get<{ data: ShipmentOption[] }>("/shipments/lookup", {
    params,
    signal,
  });
  return data.data;
};
