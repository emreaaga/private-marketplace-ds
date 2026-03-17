import { useQuery } from "@tanstack/react-query";

import { getServiceDetailApi } from "../api/get-service-detail.api";

import { servicesKeys } from "./services-keys";

export function useServiceDetail(id: number | null, enabled: boolean) {
  return useQuery({
    queryKey: servicesKeys.detail(id),
    queryFn: ({ signal }) => getServiceDetailApi(id as number, signal),
    enabled,
    staleTime: 30_000,
  });
}
