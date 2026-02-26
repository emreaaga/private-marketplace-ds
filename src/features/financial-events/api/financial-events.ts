import { api } from "@/shared/lib/api";
import { FinancialEventApi } from "@/shared/types/financial-events/financial-event-api";
import { PaginatedResponse } from "@/shared/types/paginated-response";

export const financialEventsService = {
  async getOrderEvents(orderId: number, page: number = 1, signal?: AbortSignal) {
    const { data } = await api.get<PaginatedResponse<FinancialEventApi>>("/financial-events", {
      params: { order_id: orderId, page },
      signal,
    });
    return data;
  },
};
