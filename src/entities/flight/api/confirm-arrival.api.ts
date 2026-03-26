import { api } from "@/shared/api";

export const confirmArrivalApi = async (id: number) => {
  const response = await api.patch(`/flights/${id}/confirm-arrival`);
  return response.data;
};
