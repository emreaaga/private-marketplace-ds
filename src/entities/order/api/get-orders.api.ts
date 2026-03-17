import { api, type PaginatedResponse } from "@/shared/api";

import type { OrderListItem } from "./types/orders.types";

export type GetOrdersPar = {
  page: number;
  shipment_id?: number;
};

export const getOrdersApi = async (
  params: GetOrdersPar,
  signal?: AbortSignal,
): Promise<PaginatedResponse<OrderListItem>> => {
  const { data } = await api.get<PaginatedResponse<OrderListItem>>("/orders", { params, signal });
  return data;
};
