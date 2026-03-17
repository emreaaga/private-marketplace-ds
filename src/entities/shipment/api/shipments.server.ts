"use client";

import type { PaginatedResponse } from "@/shared/api";
import { api } from "@/shared/api/api";

import type { GetShipmentQuery } from "../model/shipment.dto";
import type { Shipment } from "../model/shipment.model";

export type GetShipmentsPageParams = GetShipmentQuery & { page: number };

export const shipmentsService = {
  async getShipmentsPage(params: GetShipmentsPageParams, signal?: AbortSignal): Promise<PaginatedResponse<Shipment>> {
    const { data } = await api.get<PaginatedResponse<Shipment>>("/shipments", { params, signal });
    return data;
  },
};
