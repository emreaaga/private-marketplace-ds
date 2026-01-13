import { FinancialEvent } from "./financial-event";

export function getFinancialEventsStats(events: FinancialEvent[]) {
  const totalEvents = events.length;

  const totalIncome = events.filter((e) => e.direction === "INCOME").reduce((sum, e) => sum + e.amountUsd, 0);

  const totalExpense = events.filter((e) => e.direction === "EXPENSE").reduce((sum, e) => sum + e.amountUsd, 0);

  const result = totalIncome - totalExpense;

  return {
    totalEvents,
    totalIncome,
    totalExpense,
    result,
  };
}
