import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import type { User } from "@/shared/types/users/user.model";

type Ctx = {
  prevList?: User[];
  prevDetail?: unknown;
  id: number;
};

export function useDeleteUser() {
  const qc = useQueryClient();
  const listKey = usersKeys.list();

  return useMutation({
    mutationFn: usersService.deleteUser,

    onMutate: async (id: number): Promise<Ctx> => {
      const detailKey = usersKeys.detail(id);

      await Promise.all([qc.cancelQueries({ queryKey: listKey }), qc.cancelQueries({ queryKey: detailKey })]);

      const prevList = qc.getQueryData<User[]>(listKey);
      const prevDetail = qc.getQueryData(detailKey);

      qc.setQueryData<User[]>(listKey, (cur) => (cur ?? []).filter((u) => u.id !== id));
      qc.removeQueries({ queryKey: detailKey });

      return { prevList, prevDetail, id };
    },

    onError: (err, _id, ctx) => {
      if (ctx?.prevList) qc.setQueryData(listKey, ctx.prevList);

      if (ctx && ctx.prevDetail !== undefined) {
        qc.setQueryData(usersKeys.detail(ctx.id), ctx.prevDetail);
      }

      toast.error(getErrorMessage(err));
    },

    onSuccess: (_data, id) => {
      qc.removeQueries({ queryKey: usersKeys.detail(id) });
    },

    onSettled: (_data, _err, id) => {
      qc.invalidateQueries({ queryKey: listKey, refetchType: "active" });
      qc.removeQueries({ queryKey: usersKeys.detail(id) });
    },
  });
}
