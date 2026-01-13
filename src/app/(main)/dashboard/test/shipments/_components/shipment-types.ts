export type ShipmentStatus =
  | "DRAFT" // создана, заказы добавляются
  | "READY" // готова к передаче
  | "IN_CUSTOMS_OUT" // экспортная таможня
  | "IN_FLIGHT" // в самолёте
  | "IN_CUSTOMS_IN" // импортная таможня
  | "ARRIVED" // прибыла в страну
  | "ON_WAREHOUSE" // на складе получателя
  | "DELIVERING" // доставка клиентам
  | "CLOSED"; // финансы закрыты

export interface Shipment {
  id: string;

  postCompany: string; // Почта / фирма
  ordersCount: number;

  totalWeightKg: number;
  tariffPerKgUsd: number;

  expensesUsd: number; // доля рейса + штрафы
  incomeUsd: number; // тариф * вес

  status: ShipmentStatus;
}

import { FileText, PackageCheck, ShieldCheck, Plane, Warehouse, CheckCircle, Truck } from "lucide-react";

export const SHIPMENT_STATUS_META: Record<
  ShipmentStatus,
  {
    label: string;
    icon: React.ElementType;
    variant: "default" | "secondary" | "destructive";
  }
> = {
  DRAFT: { label: "Черн.", icon: FileText, variant: "secondary" },
  READY: { label: "Готв.", icon: PackageCheck, variant: "secondary" },

  IN_CUSTOMS_OUT: { label: "Тамж.", icon: ShieldCheck, variant: "default" },
  IN_CUSTOMS_IN: { label: "Тамж.", icon: ShieldCheck, variant: "default" },

  IN_FLIGHT: { label: "Путь.", icon: Plane, variant: "default" },

  ARRIVED: { label: "Приб.", icon: Warehouse, variant: "secondary" },
  ON_WAREHOUSE: { label: "Склд.", icon: Warehouse, variant: "secondary" },

  DELIVERING: { label: "Дост.", icon: Truck, variant: "default" },

  CLOSED: { label: "Закр.", icon: CheckCircle, variant: "secondary" },
};
