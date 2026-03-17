import { useQuery } from "@tanstack/react-query";

import { getServicesLookupApi, type GetServicesLookupParams } from "../api/get-services-lookup.api";

import { servicesKeys } from "./services-keys";

export function useServicesLookup(params: GetServicesLookupParams) {
  const enabled = Number.isFinite(params.company_id);

  return useQuery({
    queryKey: servicesKeys.lookup(params),
    queryFn: ({ signal }) => getServicesLookupApi(params, signal),
    enabled,
    staleTime: 5 * 60_000,
  });
}
