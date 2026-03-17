import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getUsersApi } from "../api/get-users.api";

import { usersKeys, type UsersListParams } from "./users.keys";

export function useUsersList(params: UsersListParams) {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: ({ signal }) => getUsersApi(params, signal),
    placeholderData: keepPreviousData,
  });
}
