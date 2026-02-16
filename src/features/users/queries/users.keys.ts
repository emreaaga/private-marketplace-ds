export type UsersListParams = { page: number };

export const usersKeys = {
  all: ["users"] as const,

  lists: () => [...usersKeys.all, "list"] as const,
  list: (params: UsersListParams) => [...usersKeys.lists(), params] as const,

  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: number | null) => [...usersKeys.details(), id] as const,
};
