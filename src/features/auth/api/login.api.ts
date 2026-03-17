import { api } from "@/shared/api";

import type { LoginPayload } from "../model/auth.types";

export const loginApi = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};
