import type { GetOrdersPageParams } from "@/features/orders/api/orders";

export const ordersKeys = {
  all: ["orders"] as const,
  lists: () => [...ordersKeys.all, "list"] as const,

  list: () => [...ordersKeys.lists(), "legacy"] as const,

  listPage: (params: GetOrdersPageParams) => [...ordersKeys.lists(), "page", params] as const,
  detail: (id: number) => [...ordersKeys.all, "detail", id] as const,
};
