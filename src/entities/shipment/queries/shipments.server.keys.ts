import { type GetShipmentsPageParams } from "../api/shipments.server";

export const shipmentsKeys = {
  all: ["shipments"] as const,

  lists: () => [...shipmentsKeys.all, "list"] as const,
  listPage: (params: GetShipmentsPageParams) => [...shipmentsKeys.lists(), "page", params] as const,
};
