import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { usersService } from "@/features/users/api/users";
import { usersKeys, type UsersListParams } from "@/features/users/queries/users.keys";

export function useUsersList(params: UsersListParams) {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: ({ signal }) => usersService.getUsers(params, signal),
    placeholderData: keepPreviousData,
  });
}
