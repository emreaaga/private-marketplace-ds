import { api } from "@/shared/api";

export const postDevSeedApi = async (): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>("/dashboard/dev-seed");
  return data;
};

export const postDevClearApi = async (): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>("/dashboard/dev-clear");
  return data;
};
