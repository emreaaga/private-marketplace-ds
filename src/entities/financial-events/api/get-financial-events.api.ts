import { api, PaginatedResponse } from "@/shared/api";

import { FinancialEventResponse } from "./types/financial-event.res";

type GetFinancialEventsParams = {
  order_id?: number;
  page?: number;
};

type GetFinancialEventsResponse = PaginatedResponse<FinancialEventResponse>;

export const getFinancialEventsApi = async (
  params: GetFinancialEventsParams,
  signal?: AbortSignal,
): Promise<GetFinancialEventsResponse> => {
  const { data } = await api.get<GetFinancialEventsResponse>("/financial-events", {
    params,
    signal,
  });
  return data;
};
