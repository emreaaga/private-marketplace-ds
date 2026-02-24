import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { ordersService, type GetOrdersPageParams } from "@/features/orders/api/orders";
import { ordersKeys } from "@/features/orders/queries/orders-keys";
// import { mapApiOrderToUi, type Order } from "@/shared/types/order/order-map.api";
// import { PaginatedResponse } from "@/shared/types/paginated-response";

export function useOrdersList(params: GetOrdersPageParams) {
  return useQuery({
    queryKey: ordersKeys.listPage(params),
    queryFn: async ({ signal }) => {
      return await ordersService.getOrdersPage(params, signal);
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
