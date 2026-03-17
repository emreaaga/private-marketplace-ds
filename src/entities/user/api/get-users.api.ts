import { api, type PaginatedResponse } from "@/shared/api";

import type { User } from "../model/user.model";

export type GetUsersParams = {
  page: number;
};

export const getUsersApi = async (params: GetUsersParams, signal?: AbortSignal) => {
  const { data } = await api.get<PaginatedResponse<User>>("/users", {
    params: { page: params.page },
    signal,
  });

  return data;
};
