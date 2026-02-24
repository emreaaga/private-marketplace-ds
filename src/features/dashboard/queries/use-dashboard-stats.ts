import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../api/dashboard";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: dashboardService.getStats,
    staleTime: 60_000,
  });
}
