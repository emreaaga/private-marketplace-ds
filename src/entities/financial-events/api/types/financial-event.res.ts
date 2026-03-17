import { FinancialEventType } from "../../model/financial-event.types";

export type FinancialEventResponse = {
  id: number;
  type: FinancialEventType;
  amount: string;
  description: string;
  created_at: string;
};
