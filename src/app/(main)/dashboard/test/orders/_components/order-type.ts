import { FileText, Package, Truck, ShieldCheck, Plane, Warehouse, CheckCircle } from "lucide-react";

export type OrderStatus =
  | "CREATED"
  | "PICKED_UP"
  | "IN_POST_WAREHOUSE"
  | "IN_CUSTOMS"
  | "IN_FLIGHT"
  | "ARRIVED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CLOSED";

export interface Order {
  id: string;

  clientName: string;
  weightKg: number;

  tariffPerKgUsd: number;
  incomeUsd: number;

  paidUsd: number;
  remainingUsd: number;

  status: OrderStatus;
}

export const ORDER_STATUS_META: Record<
  OrderStatus,
  {
    label: string;
    icon: React.ElementType;
    variant: "default" | "secondary" | "destructive";
  }
> = {
  CREATED: { label: "Созд.", icon: FileText, variant: "secondary" },
  PICKED_UP: { label: "Забр.", icon: Truck, variant: "default" },
  IN_POST_WAREHOUSE: { label: "Склд.", icon: Package, variant: "secondary" },
  IN_CUSTOMS: { label: "Тамж.", icon: ShieldCheck, variant: "default" },
  IN_FLIGHT: { label: "Пути.", icon: Plane, variant: "default" },
  ARRIVED: { label: "Приб.", icon: Warehouse, variant: "secondary" },
  OUT_FOR_DELIVERY: { label: "Курь.", icon: Truck, variant: "default" },
  DELIVERED: { label: "Дост.", icon: CheckCircle, variant: "secondary" },
  CLOSED: { label: "Закр.", icon: CheckCircle, variant: "secondary" },
};
