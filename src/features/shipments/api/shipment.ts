import { api } from "@/shared/lib/api";
import { CreateShipmentDto, GetShipmentQuery } from "@/shared/types/shipment/shipment.dto";
import { type Shipment } from "@/shared/types/shipment/shipment.model";

type ShipmentResponse = {
  data: Shipment[];
};

export const ShipmentsService = {
  async createShipment(payload: CreateShipmentDto): Promise<Shipment> {
    const { data } = await api.post<{ data: Shipment }>("/shipments", payload);
    return data.data;
  },

  async getShipments(params?: GetShipmentQuery): Promise<Shipment[]> {
    const { data } = await api.get<ShipmentResponse>("/shipments", {
      params,
    });

    return data.data;
  },
};
