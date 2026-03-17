import { api } from "@/shared/api";

import type { CreateShipmentDto } from "../model/shipment.dto";
import type { Shipment } from "../model/shipment.model";

export const createShipmentApi = async (payload: CreateShipmentDto) => {
  const { data } = await api.post<{ data: Shipment }>("/shipments", payload);
  return data.data;
};
