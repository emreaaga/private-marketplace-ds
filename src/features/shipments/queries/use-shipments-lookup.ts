import { useQuery } from "@tanstack/react-query";

import { ShipmentsService } from "@/features/shipments/api/shipment";

export function useAvailableShipments(companyId?: number) {
  return useQuery({
    queryKey: ["shipments", "lookup", companyId],
    queryFn: ({ signal }) => ShipmentsService.getShipmentsLookup({ company_id: companyId, status: "draft" }, signal),
    enabled: !!companyId,
    staleTime: 60_000,
  });
}
