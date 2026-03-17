import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUserApi } from "../api/create-user.api";

import { usersKeys } from "./users.keys";

export function useCreateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createUserApi(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
