import type { ItemCreateDTO } from "@/entities/item";
import { api } from "@/shared/api";

import type { OrderContact } from "./types/orders.types";

export type CreateOrderPay = {
  sender: OrderContact;
  receiver: OrderContact;
  order_items: ItemCreateDTO[];
  summary: {
    shipment_id: number | null;
    weight_kg: string;
    rate_per_kg: string;
    extra_fee: string;
    deposit: string;
  };
};

export type CreateOrderRes = { id: number };

export const createOrderApi = async (payload: CreateOrderPay): Promise<CreateOrderRes> => {
  const { data } = await api.post<CreateOrderRes>("/orders", payload);
  return data;
};
