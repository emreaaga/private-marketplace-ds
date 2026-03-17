import { FileText, Plane, Warehouse, Check, X, LucideIcon } from "lucide-react";

import { OrderStatus } from "./order.status";

export const ORDER_STATUS_META: Record<
  OrderStatus,
  {
    label: string;
    icon: LucideIcon;
    variant: "default" | "secondary" | "destructive";
    step: number;
  }
> = {
  received: { label: "Принят", icon: FileText, variant: "secondary", step: 1 },
  in_flight: { label: "В пути", icon: Plane, variant: "default", step: 2 },
  arrived: { label: "Прибыл", icon: Warehouse, variant: "secondary", step: 3 },
  delivered: { label: "Выдан", icon: Check, variant: "secondary", step: 4 },
  closed: { label: "Закрыт", icon: X, variant: "destructive", step: 5 },
};
