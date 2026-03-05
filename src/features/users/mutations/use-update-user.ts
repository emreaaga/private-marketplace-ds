import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";

import { useInvalidateUsers } from "../api/use-invalidate-users";

export function useUpdateUser() {
  const qc = useQueryClient();
  const { invalidate } = useInvalidateUsers();

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: any }) => usersService.updateUser(id, values),

    onSuccess: async (_, variables) => {
      await invalidate();

      qc.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });

      toast.success("Данные успешно обновлены");
    },
  });
}
