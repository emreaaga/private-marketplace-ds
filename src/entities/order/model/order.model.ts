import type { OrderStatus } from "./order.status";

export type Order = {
  id: number;

  shipment_id: number;
  sender_id: number;
  receiver_id: number;

  service_id: number;

  weight_kg: string;
  rate_per_kg: string;

  subtotal: string;
  prepaid_amount: string;
  total_amount: string;

  status: OrderStatus;

  created_at: string;
};
