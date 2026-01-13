import { DollarSign, Truck, ShieldAlert, AlertTriangle, Scale, Percent, Settings } from "lucide-react";

export type FinancialEventType =
  | "CLIENT_PAYMENT"
  | "COURIER_FEE"
  | "CUSTOMS_FEE"
  | "CUSTOMS_PENALTY"
  | "WEIGHT_ADJUSTMENT"
  | "DISCOUNT"
  | "MANUAL_ADJUSTMENT";

export type FinancialDirection = "INCOME" | "EXPENSE";

export interface FinancialEvent {
  id: string;

  orderId: string;

  type: FinancialEventType;
  direction: FinancialDirection;

  amountUsd: number;

  comment?: string;

  createdAt: string;
  createdBy: string;
}

export const FIN_EVENT_META: Record<
  FinancialEventType,
  {
    label: string;
    icon: React.ElementType;
    variant: "default" | "secondary" | "destructive";
  }
> = {
  CLIENT_PAYMENT: { label: "Оплата клиента", icon: DollarSign, variant: "default" },
  COURIER_FEE: { label: "Курьер", icon: Truck, variant: "secondary" },
  CUSTOMS_FEE: { label: "Таможня", icon: ShieldAlert, variant: "secondary" },
  CUSTOMS_PENALTY: { label: "Штраф таможни", icon: AlertTriangle, variant: "destructive" },
  WEIGHT_ADJUSTMENT: { label: "Корректировка веса", icon: Scale, variant: "secondary" },
  DISCOUNT: { label: "Скидка", icon: Percent, variant: "secondary" },
  MANUAL_ADJUSTMENT: { label: "Ручная правка", icon: Settings, variant: "secondary" },
};
