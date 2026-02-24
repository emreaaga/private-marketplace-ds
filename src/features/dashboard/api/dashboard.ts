import { api } from "@/shared/lib/api";

export type DashboardStats = {
  totalPostal: number;
  totalUsers: number;
  expectedShipments: number;
  expectedPayment: string;
};

export const dashboardService = {
  async getStats() {
    const { data } = await api.get<{ data: DashboardStats }>("/dashboard/stats");
    return data.data;
  },
};
