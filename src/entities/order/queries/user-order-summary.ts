import { useQuery } from "@tanstack/react-query";

import { getOrderSummaryApi } from "../api/get-order-summary.api";

import { ordersKeys } from "./orders-keys";

export const useOrderSummary = (id: number) => {
  return useQuery({
    queryKey: ordersKeys.summary(id),
    queryFn: ({ signal }) => getOrderSummaryApi(id, signal),
    enabled: !!id && !isNaN(id),
    staleTime: 1000 * 60 * 5,
  });
};
