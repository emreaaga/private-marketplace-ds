import { api, PaginatedResponse } from "@/shared/api";

import { FlightExpenses } from "../model/flight-expenses.model";

export type GetFlightExpensesParams = {
  flight_id: number;
  page: number;
};

type GetFlightExpensesResponse = PaginatedResponse<FlightExpenses>;

export const getFlightExpensesApi = async (
  params: GetFlightExpensesParams,
  signal?: AbortSignal,
): Promise<GetFlightExpensesResponse> => {
  const { data } = await api.get<GetFlightExpensesResponse>("/flight-expenses", {
    params,
    signal,
  });
  return data;
};
