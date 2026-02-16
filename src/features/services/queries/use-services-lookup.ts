import { useQuery } from "@tanstack/react-query";

import { servicesService, type GetServicesLookupParams } from "@/features/services/api/services";
import { servicesKeys } from "@/features/services/queries/services-keys";

export function useServicesLookup(params: GetServicesLookupParams) {
  const enabled = Number.isFinite(params.company_id);

  return useQuery({
    queryKey: servicesKeys.lookup(params),
    queryFn: ({ signal }) => servicesService.getServicesLookup(params, signal),
    enabled,
    staleTime: 5 * 60_000,
  });
}
