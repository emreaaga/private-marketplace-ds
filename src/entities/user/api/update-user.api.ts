import { api } from "@/shared/api";

import type { UserDetail } from "../model/user-detail.model";

export const updateUserApi = async (userId: number, payload: Partial<UserDetail>) => {
  const { data } = await api.patch<{ data: UserDetail }>(`/users/${userId}`, payload);
  return data.data;
};
