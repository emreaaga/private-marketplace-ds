import type { OrdersListItemApi } from "@/features/orders/api/orders";

import type { OrderStatus } from "./order.status";

export type Order = {
  id: number;
  clientName: string;
  weightKg: number;
  tariffPerKgUsd: number;
  incomeUsd: number;
  paidUsd: number;
  remainingUsd: number;
  status: OrderStatus;
  createdAt: Date;
};

const toNum = (v: string | number | null | undefined) => {
  const n = typeof v === "number" ? v : Number.parseFloat(v ?? "0");
  return Number.isFinite(n) ? n : 0;
};

export const mapApiOrderToUi = (o: OrdersListItemApi): Order => ({
  id: o.id,
  clientName: `${o.sender_name} → ${o.receiver_name}`,
  weightKg: toNum(o.weight_kg),
  tariffPerKgUsd: toNum(o.rate_per_kg),
  incomeUsd: toNum(o.total_amount),
  paidUsd: toNum(o.prepaid_amount),
  remainingUsd: toNum(o.balance),
  status: o.status,
  createdAt: new Date(o.created_at),
});
