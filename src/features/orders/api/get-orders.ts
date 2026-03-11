import { fetchWithAuth } from "@/shared/lib/fetch-with-auth";
import { PaginatedResponse } from "@/shared/types/paginated-response";

type OrdersListItemApi = {
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

interface GetOrdersParams {
  page: number;
  shipment_id?: number;
}

export async function getOrders({ page, shipment_id }: GetOrdersParams) {
  return fetchWithAuth<PaginatedResponse<OrdersListItemApi>>("/orders", {
    params: { page, shipment_id },
    tags: ["orders"],
  });
}
