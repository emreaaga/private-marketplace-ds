"use client";

import { api } from "@/shared/lib/api";
import type { PaginatedResponse } from "@/shared/types/paginated-response";
import type { CreateShipmentDto, GetShipmentQuery } from "@/shared/types/shipment/shipment.dto";
import type { Shipment } from "@/shared/types/shipment/shipment.model";

type ShipmentResponse = { data: Shipment[] };

export type ShipmentOption = { id: number; number: string };

export type GetShipmentsPageParams = GetShipmentQuery & { page: number };

export type GetShipmentsLookupParams = GetShipmentQuery & {
  q?: string;
  limit?: number;
};

export const ShipmentsService = {
  async createShipment(payload: CreateShipmentDto): Promise<Shipment> {
    const { data } = await api.post<{ data: Shipment }>("/shipments", payload);
    return data.data;
  },

  async getShipments(params?: GetShipmentQuery, signal?: AbortSignal): Promise<Shipment[]> {
    const { data } = await api.get<ShipmentResponse>("/shipments", { params, signal });
    return data.data;
  },

  async getShipmentsPage(params: GetShipmentsPageParams, signal?: AbortSignal): Promise<PaginatedResponse<Shipment>> {
    const { data } = await api.get<PaginatedResponse<Shipment>>("/shipments", { params, signal });
    return data;
  },

  async getShipmentsLookup(params?: GetShipmentsLookupParams, signal?: AbortSignal): Promise<ShipmentOption[]> {
    const { data } = await api.get<{ data: ShipmentOption[] }>("/shipments/lookup", { params, signal });
    return data.data;
  },
};
