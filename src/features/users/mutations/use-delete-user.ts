import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";
import { getErrorMessage } from "@/shared/lib/get-error-message";

export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: usersService.deleteUser,

    onSuccess: (_data, id) => {
      qc.removeQueries({ queryKey: usersKeys.detail(id) });
    },

    onError: (err) => {
      toast.error(getErrorMessage(err));
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
