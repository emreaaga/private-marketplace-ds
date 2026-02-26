import { useQuery } from "@tanstack/react-query";

import { financialEventsService } from "../api/financial-events";

import { financialEventsKeys } from "./financial-events.keys";

export const useOrderFinancialEvents = (orderId: number, page: number = 1) => {
  return useQuery({
    // Используем нашу новую фабрику ключей:
    queryKey: financialEventsKeys.list({ order_id: orderId, page }),
    queryFn: ({ signal }) => financialEventsService.getOrderEvents(orderId, page, signal),
    enabled: !!orderId && !isNaN(orderId),
  });
};
