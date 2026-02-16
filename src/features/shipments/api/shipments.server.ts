"use client";

import { api } from "@/shared/lib/api";
import type { PaginatedResponse } from "@/shared/types/paginated-response";
import type { GetShipmentQuery } from "@/shared/types/shipment/shipment.dto";
import type { Shipment } from "@/shared/types/shipment/shipment.model";

export type GetShipmentsPageParams = GetShipmentQuery & { page: number };

export const shipmentsService = {
  async getShipmentsPage(params: GetShipmentsPageParams, signal?: AbortSignal): Promise<PaginatedResponse<Shipment>> {
    const { data } = await api.get<PaginatedResponse<Shipment>>("/shipments", { params, signal });
    return data;
  },
};
