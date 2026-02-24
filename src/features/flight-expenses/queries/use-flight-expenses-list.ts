import { useQuery } from "@tanstack/react-query";

import { FlightExpensesService, GetFlightExpensesPageParams } from "../api/flight-expenses";

import { flightExpensesKeys } from "./flight-expenses.keys";

export const useFlightExpensesList = (params: GetFlightExpensesPageParams) => {
  return useQuery({
    queryKey: flightExpensesKeys.list(params),
    queryFn: ({ signal }) => FlightExpensesService.getAllPage(params, signal),
    placeholderData: (previousData) => previousData,
    enabled: !!params.flight_id,
  });
};
