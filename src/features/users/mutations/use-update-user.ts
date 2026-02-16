import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import type { User } from "@/shared/types/users/user.model";

import type { EditUserFormValues } from "../ui/organisms/dialogs/edit-user/edit-user.types";

type Vars = { id: number; values: EditUserFormValues };

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: Vars) => usersService.updateUser(id, values),

    onSuccess: (updated, vars) => {
      const listKey = usersKeys.list();
      const detailKey = usersKeys.detail(vars.id);

      qc.setQueryData(detailKey, updated);

      qc.setQueryData<User[]>(listKey, (cur) => {
        if (!cur) return cur;
        return cur.map((u) => (u.id === vars.id ? ({ ...u, ...(updated as Partial<User>) } as User) : u));
      });

      qc.invalidateQueries({ queryKey: listKey, refetchType: "active" });
      qc.invalidateQueries({ queryKey: detailKey, refetchType: "active" });
    },

    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
}
