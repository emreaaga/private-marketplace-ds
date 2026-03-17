import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateUserApi } from "../api/update-user.api";
import { useInvalidateUsers } from "../lib/use-invalidate-users";

import { usersKeys } from "./users.keys";

export function useUpdateUser() {
  const qc = useQueryClient();
  const { invalidate } = useInvalidateUsers();

  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: any }) => updateUserApi(id, values),

    onSuccess: async (_, variables) => {
      await invalidate();

      qc.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });

      toast.success("Данные успешно обновлены");
    },
  });
}
