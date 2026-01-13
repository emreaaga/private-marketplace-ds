import { Flight } from "./flight-types";

export function getFlightsStats(flights: Flight[]) {
  const totalFlights = flights.length;

  const inAir = flights.filter((f) => f.status === "IN_AIR").length;

  const totalWeight = flights.reduce((sum, f) => sum + f.totalWeightKg, 0);

  const totalIncome = flights.reduce((sum, f) => sum + f.incomeUsd, 0);

  const totalExpenses = flights.reduce((sum, f) => sum + f.expensesUsd, 0);

  const balance = totalIncome - totalExpenses;

  return {
    totalFlights,
    inAir,
    totalWeight,
    totalIncome,
    balance,
  };
}
