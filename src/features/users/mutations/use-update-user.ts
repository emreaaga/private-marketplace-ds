import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import type { PaginatedResponse } from "@/shared/types/paginated-response";
import type { User, UserDetail } from "@/shared/types/users";

import type { EditUserFormValues } from "../ui/organisms/dialogs/edit-user/edit-user.types";

type Vars = { id: number; values: EditUserFormValues };

function toListUser(u: UserDetail): User {
  return {
    id: u.id,
    company_name: u.company_name,
    company_type: u.company_type,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    created_at: u.created_at,
  };
}

export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: Vars) => usersService.updateUser(id, values),

    onSuccess: (updated, vars) => {
      const detailKey = usersKeys.detail(vars.id);

      qc.setQueryData<UserDetail>(detailKey, updated);

      const patch = toListUser(updated);

      qc.setQueriesData<PaginatedResponse<User>>({ queryKey: usersKeys.lists() }, (cur) => {
        if (!cur) return cur;
        return {
          ...cur,
          data: cur.data.map((u) => (u.id === vars.id ? { ...u, ...patch } : u)),
        };
      });
      qc.invalidateQueries({ queryKey: usersKeys.lists(), refetchType: "active" });
    },

    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
}
