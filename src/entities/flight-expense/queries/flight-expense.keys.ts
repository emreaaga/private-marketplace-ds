import { GetFlightExpensesParams } from "../api/get-flight-expenses.api";

export const flightExpenseKeys = {
  all: ["flight-expenses"] as const,
  lists: () => [...flightExpenseKeys.all, "list"] as const,
  list: (params: GetFlightExpensesParams) => [...flightExpenseKeys.lists(), params] as const,
};
