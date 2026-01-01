import { Clock, Truck, CheckCircle2, XCircle } from "lucide-react";

export type OrderStatus = "created" | "in_transit" | "at_hub" | "with_courier" | "delivered" | "canceled";

export type PaymentType = "prepaid" | "cod";
export type PaymentLocation = "origin" | "destination";
export type PaymentMethod = "prepaid" | "cod";

export type Payment = {
  method: PaymentMethod;
  amount: number;
  location: PaymentLocation;
  paidAt?: string;
};

export type ExtraCharge = {
  title: string;
  amount: number;
};

export type CargoPricing = {
  weightKg: number;
  ratePerKg: number;
  extraCharges: ExtraCharge[];
};

export type PaymentSummary = {
  cargoCost: number;
  extrasTotal: number;
  total: number;

  paidOrigin: number;
  paidDestination: number;

  currency: "USD";
};

export type Order = {
  id: string;
  counter: number;
  test: string;

  sender: {
    name: string;
    phone: string;
    city: string;
  };

  recipient: {
    name: string;
    phone: string;
    city: string;
  };

  pricing: CargoPricing;

  payments: Payment[];

  paymentSummary: PaymentSummary;

  status: OrderStatus;
  date: string;
};

export const STATUS_MAP: Record<
  Order["status"],
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  created: {
    label: "Создан",
    className: "bg-slate-500/10 text-slate-700",
    icon: Clock,
  },
  in_transit: {
    label: "В пути",
    className: "bg-blue-500/10 text-blue-700",
    icon: Truck,
  },
  delivered: {
    label: "Доставлен",
    className: "bg-green-500/10 text-green-700",
    icon: CheckCircle2,
  },
  canceled: {
    label: "Отменён",
    className: "bg-red-500/10 text-red-700",
    icon: XCircle,
  },
  at_hub: {
    label: "",
    className: "",
    icon: "symbol",
  },
  with_courier: {
    label: "",
    className: "",
    icon: "symbol",
  },
};

export const STATUS_FLOW: Order["status"][] = ["created", "in_transit", "delivered"];

export const STEP_LABELS: Record<OrderStatus, string> = {
  created: "Создан",
  in_transit: "В пути",
  at_hub: "Склад",
  with_courier: "Курьера",
  delivered: "Дост",
  canceled: "Отменён",
};
