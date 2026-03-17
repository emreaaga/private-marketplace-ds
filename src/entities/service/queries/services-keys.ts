import { GetServicesLookupParams } from "../api/get-services-lookup.api";
import { GetServicesParams } from "../model/services.query";

export type ServicesListParams = GetServicesParams & { page: number };

export const servicesKeys = {
  all: ["services"] as const,

  lists: () => [...servicesKeys.all, "list"] as const,
  listPage: (params: ServicesListParams) => [...servicesKeys.lists(), "page", params] as const,
  lookup: (params: GetServicesLookupParams) => [...servicesKeys.lists(), "lookup", params] as const,

  details: () => [...servicesKeys.all, "detail"] as const,
  detail: (id: number | null) => [...servicesKeys.details(), id] as const,
};
