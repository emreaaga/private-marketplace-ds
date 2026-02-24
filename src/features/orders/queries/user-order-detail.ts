import { useQuery } from "@tanstack/react-query";

import { ordersService } from "../api/orders";

import { ordersKeys } from "./orders-keys";

export function useOrderDetail(id: number | null) {
  return useQuery({
    queryKey: ordersKeys.detail(id as number),
    queryFn: async ({ signal }) => {
      const res = await ordersService.getOrder(id as number, signal);
      return res;
    },
    enabled: id !== null,
    staleTime: 60_000,
  });
}
