import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";

export function useCreateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => usersService.createUser(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
