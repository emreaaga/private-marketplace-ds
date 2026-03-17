import { api } from "@/shared/api";

export type DashboardStatsResponse = {
  totalPostal: number;
  totalUsers: number;
  expectedShipments: number;
  expectedPayment: string;
};

export const getDashboardStatsApi = async (): Promise<DashboardStatsResponse> => {
  const { data } = await api.get<{ data: DashboardStatsResponse }>("/dashboard/stats");
  return data.data;
};
