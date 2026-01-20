import { RegisterPayload, LoginPayload } from "@/features/auth/types/auth.types";
import { api } from "@/shared/lib/api";

export const authService = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },

  async logout() {
    const { data } = await api.post("/auth/logout");
    return data;
  },
};
