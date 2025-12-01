import { api } from "@/lib/api";
import { token } from "@/lib/token";
import { RegisterPayload, LoginPayload } from "@/types/auth.types";

export const authService = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await api.post("/auth/login", payload);
    token.set(data.accessToken);
    return data;
  },

  async logout() {
    const { data } = await api.post("/auth/logout");
    token.clear();
    return data;
  },

  async refresh() {
    const { data } = await api.post("/auth/refresh");
    token.set(data.accessToken);
    return data;
  },
};
