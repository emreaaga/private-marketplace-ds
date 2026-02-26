import { FinancialEventType } from "./financial-event-type";

export type FinancialEventApi = {
  id: number;
  type: FinancialEventType;
  amount: string;
  description: string;
  created_at: string;
};
