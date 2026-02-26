import { FinancialEventType } from "./financial-event-type";

export const FINANCIAL_EVENT_STATUS_CONFIG: Record<
  FinancialEventType,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  payment: { label: "Оплата", variant: "default" },
  prepayment: { label: "Предоплата", variant: "secondary" },
  additional: { label: "Доплата", variant: "outline" },
  penalty: { label: "Штраф", variant: "destructive" },
  adjustment: { label: "Корректировка", variant: "outline" },
  refund: { label: "Возврат", variant: "destructive" },
};
