import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getOrdersApi, type GetOrdersPar } from "../api/get-orders.api";

import { ordersKeys } from "./orders-keys";

export function useOrdersList(params: GetOrdersPar) {
  return useQuery({
    queryKey: ordersKeys.listPage(params),
    queryFn: async ({ signal }) => {
      return await getOrdersApi(params, signal);
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
