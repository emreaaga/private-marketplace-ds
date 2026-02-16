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

type DeleteAction = { type: "delete"; userId: number } | null;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function UsersMainPage() {
  const [deleteAction, setDeleteAction] = useState<DeleteAction>(null);

  const [page, setPage] = useState(1);

  const [editOpen, setEditOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const { data, isLoading, isError } = useUsersList({ page });

  const users = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();

  const openEdit = (id: number) => {
    setEditUserId(id);
    setEditOpen(true);
  };

  const closeEdit = () => setEditOpen(false);

  const openDelete = (id: number) => setDeleteAction({ type: "delete", userId: id });

  const closeDelete = () => {
    if (deleteUser.isPending) return;
    setDeleteAction(null);
  };

  const columns = useMemo(
    () =>
      createUsersColumns({
        onEdit: (user) => openEdit(user.id),
        onDelete: (user) => openDelete(user.id),
      }),
    [],
  );

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

  const selectedUserId = deleteAction?.userId ?? null;

  return (
    <div className="space-y-4">
      <UsersToolbar />

      <DataTable
        columns={columns}
        data={users}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />

      <EditUserDialog
        open={editOpen}
        userId={editUserId}
        onOpenChange={(next) => !next && closeEdit()}
        onSubmitAction={(id, values) => updateUser.mutateAsync({ id, values })}
      />

      <DeleteDialog
        open={selectedUserId !== null}
        entityId={selectedUserId ?? undefined}
        pending={deleteUser.isPending}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={async () => {
          if (selectedUserId == null) return;
          await deleteUser.mutateAsync(selectedUserId);
          setDeleteAction(null);
        }}
      />
    </div>
  );
}
