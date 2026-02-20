"use client";

import { api } from "@/shared/lib/api";
import type { CreateFlightDto, FlightDetails, ApiResponse } from "@/shared/types/flight/flight.dto";
import type { Flight } from "@/shared/types/flight/flight.model";
import type { PaginatedResponse } from "@/shared/types/paginated-response";

export type GetFlightsPageParams = {
  page: number;
};

export const flightsService = {
  async createFlight(payload: CreateFlightDto) {
    const { data } = await api.post("/flights", payload);
    return data;
  },

  async updateFlight(id: number, payload: any) {
    console.log(id, payload);
    const { data } = await api.put<ApiResponse<Flight>>(`/flights/${id}`, payload);
    return data.data;
  },

  async getFlightsPage(params: GetFlightsPageParams, signal?: AbortSignal): Promise<PaginatedResponse<Flight>> {
    const { data } = await api.get<PaginatedResponse<Flight>>("/flights", {
      params,
      signal,
    });
    return data;
  },

  async getFlight(id: number, signal?: AbortSignal): Promise<FlightDetails> {
    const { data } = await api.get<ApiResponse<FlightDetails>>(`/flights/${id}`, { signal });
    return data.data;
  },
};
