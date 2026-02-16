import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { servicesService } from "@/features/services/api/services";
import { servicesKeys, type ServicesListParams } from "@/features/services/queries/services-keys";

export function useServicesList(params: ServicesListParams) {
  return useQuery({
    queryKey: servicesKeys.listPage(params),
    queryFn: ({ signal }) => servicesService.getServicesPage(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
