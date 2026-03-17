import { useQuery } from "@tanstack/react-query";

import { getOrderDetailApi } from "../api/get-order-detail.api";

import { ordersKeys } from "./orders-keys";

export function useOrderDetail(id: number | null) {
  return useQuery({
    queryKey: ordersKeys.detail(id as number),
    queryFn: async ({ signal }) => {
      const res = await getOrderDetailApi(id as number, signal);
      return res;
    },
    enabled: id !== null,
    staleTime: 60_000,
  });
}
