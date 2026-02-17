import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";
import { getErrorMessage } from "@/shared/lib/get-error-message";

export function useCreateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => usersService.createUser(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.lists() });
    },

    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
}
