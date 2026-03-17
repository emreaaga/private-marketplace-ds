import { api } from "@/shared/api";

import type { RegisterPayload } from "../model/auth.types";

export const registerApi = async (payload: RegisterPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
