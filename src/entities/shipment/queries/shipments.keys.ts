import type { GetShipmentsLookupParams, GetShipmentsPageParams } from "../model/shipment.dto";

export const shipmentsKeys = {
  all: ["shipments"] as const,

  lists: () => [...shipmentsKeys.all, "list"] as const,

  list: (params: { status?: string } = {}) => [...shipmentsKeys.lists(), "legacy", params] as const,

  listPage: (params: GetShipmentsPageParams) => [...shipmentsKeys.lists(), "page", params] as const,

  lookup: (params: GetShipmentsLookupParams) => [...shipmentsKeys.lists(), "lookup", params] as const,

  details: () => [...shipmentsKeys.all, "detail"] as const,
  detail: (id: number | null) => [...shipmentsKeys.details(), id] as const,
};
