import { api } from "@/shared/api";

type OrderSummaryRes = {
  total_amount: string;
  extra_fee: string;
  prepaid_amount: string;
  air_kg_price: string;
  rate_per_kg: string;
  balance: string;
};

export const getOrderSummaryApi = async (id: number, signal?: AbortSignal): Promise<OrderSummaryRes> => {
  const { data } = await api.get<{ data: OrderSummaryRes }>(`/orders/${id}/summary`, {
    signal,
  });
  return data.data;
};
