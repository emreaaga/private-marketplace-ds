import { useQuery } from "@tanstack/react-query";

import { ordersService } from "../api/orders";

import { ordersKeys } from "./orders-keys";

export const useOrderSummary = (id: number) => {
  return useQuery({
    queryKey: ordersKeys.summary(id),
    queryFn: ({ signal }) => ordersService.getOrderSummary(id, signal),
    enabled: !!id && !isNaN(id),
    staleTime: 1000 * 60 * 5,
  });
};
