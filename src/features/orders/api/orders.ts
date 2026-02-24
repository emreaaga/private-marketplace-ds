import { api } from "@/shared/lib/api";
import type { ItemCreateDTO } from "@/shared/types/order/item/item-create.dto";
import type { PaginatedResponse } from "@/shared/types/paginated-response";

export type ApiPassport = { passport_number: string };

export type ApiClient = {
  name: string;
  surname: string;
  country: string | null;
  city: string | null;
  district: string | null;
  phone_country_code: string;
  phone_number: string;
  address_line: string;
  passports: ApiPassport[];
};

export type CreateOrderPayload = {
  sender: ApiClient;
  receiver: ApiClient;
  order_items: ItemCreateDTO[];
  summary: {
    shipment_id: number | null;
    weight_kg: string;
    rate_per_kg: string;
    extra_fee: string;
    deposit: string;
  };
};

export type CreateOrderResponse = { id: number };

export type OrdersListItemApi = {
  id: number;
  sender_name: string;
  receiver_name: string;
  weight_kg: string;
  rate_per_kg: string;
  extra_fee: string;
  total_amount: string;
  prepaid_amount: string;
  balance: string;
  status: "received" | "in_flight" | "arrived" | "delivered" | "closed";
  created_at: string;
};

export type OrdersListResponseApi = { data: OrdersListItemApi[] };

export type OrdersListPaginatedResponseApi = PaginatedResponse<OrdersListItemApi>;

export type GetOrdersPageParams = {
  page: number;
  shipment_id?: number;
};

export const ordersService = {
  async getOrdersPage(
    params: GetOrdersPageParams,
    signal?: AbortSignal,
  ): Promise<PaginatedResponse<OrdersListItemApi>> {
    const { data } = await api.get<OrdersListPaginatedResponseApi>("/orders", { params, signal });
    return data;
  },

  async createOrder(payload: CreateOrderPayload) {
    const { data } = await api.post<CreateOrderResponse>("/orders", payload);
    return data;
  },

  async getOrder(id: number, signal?: AbortSignal) {
    const { data } = await api.get(`/orders/${id}`, { signal });
    return data;
  },
};
