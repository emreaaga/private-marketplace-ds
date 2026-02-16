import React from "react";

import { FileText, Plane, Warehouse, CheckCircle, XCircle } from "lucide-react";

import { OrderStatus } from "./order.status";

export const ORDER_STATUS_META: Record<
  OrderStatus,
  {
    label: string;
    icon: React.ElementType;
    variant: "default" | "secondary" | "destructive";
  }
> = {
  received: { label: "Принят", icon: FileText, variant: "secondary" },
  in_flight: { label: "В пути", icon: Plane, variant: "default" },
  arrived: { label: "Прибыл", icon: Warehouse, variant: "secondary" },
  delivered: { label: "Выдан", icon: CheckCircle, variant: "secondary" },
  closed: { label: "Закрыт", icon: XCircle, variant: "secondary" },
};
