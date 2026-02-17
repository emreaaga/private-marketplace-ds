import { useQuery } from "@tanstack/react-query";

import { servicesService } from "../api/services";

import { servicesKeys } from "./services-keys";

export function useServiceDetail(id: number | null, enabled: boolean) {
  return useQuery({
    queryKey: servicesKeys.detail(id),
    queryFn: ({ signal }) => servicesService.getService(id as number, signal),
    enabled,
    staleTime: 30_000,
  });
}
