import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";

import type { EditUserFormValues } from "../ui/organisms/dialogs/edit-user/edit-user.types";

type Vars = { id: number; values: EditUserFormValues };

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: Vars) => usersService.updateUser(id, values),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.all });
      toast.success("Данные пользователя обновлены");
    },
  });
}
