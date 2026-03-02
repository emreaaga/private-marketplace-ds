import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";

export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: usersService.deleteUser,

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
