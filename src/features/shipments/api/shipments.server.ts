import { apiServer } from "@/shared/lib/api.server";
import { GetShipmentQuery } from "@/shared/types/shipment/shipment.dto";
import { Shipment } from "@/shared/types/shipment/shipment.model";

type ShipmentResponse = {
  data: Shipment[];
};

export const ShipmentsServerService = {
  async getShipments(params?: GetShipmentQuery): Promise<Shipment[]> {
    const { data } = await apiServer.get<ShipmentResponse>("/shipments", { params });
    return data.data;
  },
};
