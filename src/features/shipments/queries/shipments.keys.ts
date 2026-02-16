import type { GetShipmentsLookupParams, GetShipmentsPageParams } from "@/features/shipments/api/shipment";

export const shipmentsKeys = {
  all: ["shipments"] as const,

  lists: () => [...shipmentsKeys.all, "list"] as const,

  // ✅ legacy — не трогаем, чтобы не ломать существующие места
  list: (params: { status?: string } = {}) => [...shipmentsKeys.lists(), "legacy", params] as const,

  // ✅ новый ключ для пагинации (таблицы)
  listPage: (params: GetShipmentsPageParams) => [...shipmentsKeys.lists(), "page", params] as const,

  // ✅ новый ключ для lookup (селекты)
  lookup: (params: GetShipmentsLookupParams) => [...shipmentsKeys.lists(), "lookup", params] as const,

  details: () => [...shipmentsKeys.all, "detail"] as const,
  detail: (id: number | null) => [...shipmentsKeys.details(), id] as const,
};
