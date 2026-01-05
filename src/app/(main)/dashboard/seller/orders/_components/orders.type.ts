import { Truck, CheckCircle2, XCircle, Warehouse, User } from "lucide-react";

export type OrderStatus = "client" | "courier" | "in_transit" | "at_hub" | "with_courier" | "delivered" | "canceled";

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
  OrderStatus,
  {
    label: string;
    className: string;
    icon: React.ElementType;
  }
> = {
  client: {
    label: "Создан клиентом",
    className: "bg-slate-500/10 text-slate-700",
    icon: User,
  },

  courier: {
    label: "Забрал курьер",
    className: "bg-indigo-500/10 text-indigo-700",
    icon: Truck,
  },

  in_transit: {
    label: "В пути",
    className: "bg-blue-500/10 text-blue-700",
    icon: Truck,
  },

  at_hub: {
    label: "На почте",
    className: "bg-amber-500/10 text-amber-700",
    icon: Warehouse,
  },

  with_courier: {
    label: "У курьера",
    className: "bg-purple-500/10 text-purple-700",
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
};
