import type { GetOrdersPageParams } from "@/features/orders/api/orders";

export const ordersKeys = {
  all: ["orders"] as const,
  lists: () => [...ordersKeys.all, "list"] as const,

  // legacy
  list: () => [...ordersKeys.lists(), "legacy"] as const,

  // ✅ новое для пагинации
  listPage: (params: GetOrdersPageParams) => [...ordersKeys.lists(), "page", params] as const,
};
