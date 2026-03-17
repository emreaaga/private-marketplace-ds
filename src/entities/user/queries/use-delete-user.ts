import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUserApi } from "../api/delete-user.api";

import { usersKeys } from "./users.keys";

export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,

    onSuccess: (_data, id) => {
      qc.removeQueries({ queryKey: usersKeys.detail(id) });
    },

    onSettled: (_data, _error, id) => {
      qc.invalidateQueries({
        queryKey: usersKeys.lists(),
        refetchType: "active",
      });

      qc.removeQueries({ queryKey: usersKeys.detail(id) });
    },
  });
}
