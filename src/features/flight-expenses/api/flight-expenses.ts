"use client";
import { api } from "@/shared/lib/api";
import { FlightExpenses } from "@/shared/types/flight-expenses";
import type { PaginatedResponse } from "@/shared/types/paginated-response";

export type GetFlightExpensesPageParams = {
  flight_id: number;
  page: number;
};

export const FlightExpensesService = {
  async getAllPage(
    params: GetFlightExpensesPageParams,
    signal?: AbortSignal,
  ): Promise<PaginatedResponse<FlightExpenses>> {
    const { data } = await api.get<PaginatedResponse<FlightExpenses>>("/flight-expenses", {
      params,
      signal,
    });
    return data;
  },
};
