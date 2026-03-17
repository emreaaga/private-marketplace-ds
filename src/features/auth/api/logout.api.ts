import { useSessionStore } from "@/entities/session";
import { api } from "@/shared/api";

export const logoutApi = async () => {
  const { data } = await api.post("/auth/logout");

  useSessionStore.getState().setSession(null);

  return data;
};
