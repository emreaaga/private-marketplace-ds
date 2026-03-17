import { api } from "@/shared/api";

import type { OrderContact, OrderItem } from "./types/orders.types";

export type GetOrderDetailRes = {
  id: number;
  sender: OrderContact;
  receiver: OrderContact;
  orderItems: OrderItem[];
  summary: {
    prepaid_amount: string;
    extra_fee: string;
    rate_per_kg: string;
    shipment_id: number;
    weight_kg: string;
  };
};

export const getOrderDetailApi = async (id: number, signal?: AbortSignal): Promise<GetOrderDetailRes> => {
  const { data } = await api.get<{ data: GetOrderDetailRes }>(`/orders/${id}`, { signal });
  return data.data;
};
