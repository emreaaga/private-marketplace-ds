"use client";

import { useQuery } from "@tanstack/react-query";

import { getFinancialEventsApi } from "../api/get-financial-events.api";

import { financialEventsKeys } from "./financial-event.keys";

export const useFinancialEvents = (orderId: number, page: number = 1) => {
  return useQuery({
    queryKey: financialEventsKeys.list({ order_id: orderId, page }),
    queryFn: ({ signal }) => getFinancialEventsApi({ order_id: orderId, page }, signal),
    enabled: !!orderId && !isNaN(orderId),
  });
};
