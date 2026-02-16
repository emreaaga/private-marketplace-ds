"use client";

import { useMemo, useState } from "react";

import { useDeleteUser } from "@/features/users/mutations/use-delete-user";
import { useUpdateUser } from "@/features/users/mutations/use-update-user";
import { useUsersList } from "@/features/users/queries/use-users-list";
import { EditUserDialog } from "@/features/users/ui/organisms/dialogs/edit-user/edit-user-dialog";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { createUsersColumns } from "@/features/users/ui/organisms/users-columns";
import { DeleteDialog } from "@/shared/ui/organisms/delete-dialog";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

type Action = { type: "edit" | "delete"; userId: number } | null;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

// eslint-disable-next-line complexity
export default function UsersMainPage() {
  const [action, setAction] = useState<Action>(null);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useUsersList({ page });

  const users = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();

  const selectedUserId = action?.userId ?? null;
  const mode = action?.type ?? null;

  const columns = useMemo(
    () =>
      createUsersColumns({
        onEdit: (user) => setAction({ type: "edit", userId: user.id }),
        onDelete: (user) => setAction({ type: "delete", userId: user.id }),
      }),
    [],
  );

  const close = () => {
    if (deleteUser.isPending) return;
    setAction(null);
  };

  const emptyMessage = isLoading
    ? "Загрузка..."
    : isError
      ? "Не удалось загрузить пользователей"
      : "Пользователи не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  return (
    <div className="space-y-4">
      <UsersToolbar />

      <DataTable
        columns={columns}
        data={users}
        emptyMessage={emptyMessage}
        serverPagination={{
          page,
          pageCount,
          onPageChange,
        }}
        fixedPageSize={10}
      />

      <EditUserDialog
        open={mode === "edit"}
        userId={selectedUserId}
        onOpenChange={(open) => !open && close()}
        onSubmitAction={async (id, values) => {
          await updateUser.mutateAsync({ id, values });
        }}
      />

      <DeleteDialog
        open={mode === "delete"}
        entityId={selectedUserId ?? undefined}
        pending={deleteUser.isPending}
        onOpenChange={(open) => !open && close()}
        onConfirm={async () => {
          if (selectedUserId == null) return;
          await deleteUser.mutateAsync(selectedUserId);
          setAction(null);
        }}
      />
    </div>
  );
}
