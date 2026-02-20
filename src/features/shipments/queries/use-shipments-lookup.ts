import { useQuery } from "@tanstack/react-query";

import { ShipmentsService } from "@/features/shipments/api/shipment";

export function useAvailableShipments(companyId?: number) {
  return useQuery({
    queryKey: ["shipments", "search", companyId],
    queryFn: () => ShipmentsService.getShipments({ company_id: companyId, status: "draft" }),
    enabled: !!companyId,
    staleTime: 60_000,
  });
}
