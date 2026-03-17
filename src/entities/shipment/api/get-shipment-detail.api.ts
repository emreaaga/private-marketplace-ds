import { api } from "@/shared/api";

import type { Shipment } from "../model/shipment.model";

export const getShipmentDetailApi = async (id: number, signal?: AbortSignal) => {
  const { data } = await api.get<{ data: Shipment }>(`/shipments/${id}`, { signal });
  return data.data;
};
