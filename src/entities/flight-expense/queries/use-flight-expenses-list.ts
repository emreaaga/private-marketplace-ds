"use client";

import { useQuery } from "@tanstack/react-query";

import { getFlightExpensesApi } from "../api/get-flight-expenses.api";

import { flightExpenseKeys } from "./flight-expense.keys";

export const useFlightExpensesList = (params: { flight_id: number; page: number }) => {
  return useQuery({
    queryKey: flightExpenseKeys.list(params),
    queryFn: ({ signal }) => getFlightExpensesApi(params, signal),
    placeholderData: (previousData) => previousData,
    enabled: !!params.flight_id,
  });
};
