import { GetFlightExpensesPageParams } from "../api/flight-expenses";

export const flightExpensesKeys = {
  all: ["flight-expenses"] as const,
  lists: () => [...flightExpensesKeys.all, "list"] as const,
  list: (params: GetFlightExpensesPageParams) => [...flightExpensesKeys.lists(), params] as const,
};
