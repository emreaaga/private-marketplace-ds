import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getServicesApi } from "../api/get-services.api";

import { servicesKeys, type ServicesListParams } from "./services-keys";

export function useServicesList(params: ServicesListParams) {
  return useQuery({
    queryKey: servicesKeys.listPage(params),
    queryFn: ({ signal }) => getServicesApi(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
