import { OrderStatus } from "@/entities/order";
import { api, type PaginatedResponse } from "@/shared/api";

export type TripStopOrder = {
  id: number;
  receiver_name: string;
  weight_kg: string;
  remaining: string;
  status: OrderStatus;
};

export type GetTripStopOrdersRes = PaginatedResponse<TripStopOrder>;

export const getTripStopOrdersApi = async (
  tripId: number,
  branchId: number,
  params: { page?: number } = {},
  signal?: AbortSignal,
) => {
  const { data } = await api.get<GetTripStopOrdersRes>(`/trips/${tripId}/stops/${branchId}/orders`, {
    params,
    signal,
  });

  return data;
};
