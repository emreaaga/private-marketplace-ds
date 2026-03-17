import { FlightExpensesType } from "./flight-expenses.types";

export type FlightExpenses = {
  id: number;
  type: FlightExpensesType;
  amount: string;
  description: string;
};
