"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboardStatsApi } from "../api/get-dashboard-stats.api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStatsApi,
    staleTime: 60_000,
  });
}
