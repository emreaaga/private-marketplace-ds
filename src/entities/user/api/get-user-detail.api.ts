import { api } from "@/shared/api";

import type { UserDetail } from "../model/user-detail.model";

export const getUserDetailApi = async (userId: number, signal?: AbortSignal) => {
  const { data } = await api.get<{ data: UserDetail }>(`/users/${userId}`, { signal });
  return data.data;
};
