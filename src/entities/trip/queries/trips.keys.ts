export const tripsKeys = {
  all: ["trips"] as const,

  lists: () => [...tripsKeys.all, "list"] as const,

  list: (params: Record<string, any> = {}) => [...tripsKeys.lists(), params] as const,

  details: () => [...tripsKeys.all, "detail"] as const,
  detail: (id: number | null) => [...tripsKeys.details(), id] as const,

  stops: (id: number | null) => [...tripsKeys.detail(id), "stops"] as const,
  stopOrders: (tripId: number | null, branchId: number | null) =>
    [...tripsKeys.stops(tripId), branchId, "orders"] as const,
};
