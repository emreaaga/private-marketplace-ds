import { useQuery } from "@tanstack/react-query";

import { getShipmentsLookupApi } from "../api/get-shipments-lookup.api";

export function useAvailableShipments(companyId?: number) {
  return useQuery({
    queryKey: ["shipments", "lookup", companyId],
    queryFn: ({ signal }) => getShipmentsLookupApi({ company_id: companyId, status: "draft" }, signal),
    enabled: !!companyId,
    staleTime: 60_000,
  });
}
