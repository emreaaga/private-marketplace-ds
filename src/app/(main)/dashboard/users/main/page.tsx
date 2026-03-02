"use client";

import { useCallback, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { useDeleteUser } from "@/features/users/mutations/use-delete-user";
import { useUpdateUser } from "@/features/users/mutations/use-update-user";
import { useUsersList } from "@/features/users/queries/use-users-list";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { createUsersColumns } from "@/features/users/ui/organisms/users-columns";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

const EditUserDialog = dynamic(
  () => import("@/features/users/ui/organisms/dialogs/edit-user/edit-user-dialog").then((m) => m.EditUserDialog),
  { ssr: false },
);

const DeleteDialog = dynamic(() => import("@/shared/ui/organisms/delete-dialog").then((m) => m.DeleteDialog), {
  ssr: false,
});

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

type DeleteAction = { type: "delete"; userId: number } | null;

export default function UsersMainPage() {
  const [page, setPage] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [deleteAction, setDeleteAction] = useState<DeleteAction>(null);

  const { data, isLoading, isError } = useUsersList({ page });
  const users = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();

  const openEdit = useCallback((id: number) => {
    setEditUserId(id);
    setEditOpen(true);
  }, []);

  const closeEdit = () => {
    setEditOpen(false);
    setEditUserId(null);
  };

  const openDelete = useCallback((id: number) => {
    setDeleteAction({ type: "delete", userId: id });
  }, []);

  const closeDelete = () => {
    if (deleteUser.isPending) return;
    setDeleteAction(null);
  };

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  const columns = useMemo(
    () =>
      createUsersColumns({
        onEdit: (user) => openEdit(user.id),
        onDelete: (user) => openDelete(user.id),
      }),
    [openEdit, openDelete],
  );

  const emptyMessage = isLoading
    ? "Загрузка..."
    : isError
      ? "Не удалось загрузить пользователей"
      : "Пользователи не найдены";

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

      {editOpen && (
        <EditUserDialog
          open={editOpen}
          userId={editUserId}
          onOpenChange={(next) => !next && closeEdit()}
          onSubmitAction={async (id, values) => {
            await updateUser.mutateAsync({ id, values });
            closeEdit();
          }}
        />
      )}

      {selectedUserId !== null && (
        <DeleteDialog
          open={selectedUserId !== null}
          entityId={selectedUserId}
          pending={deleteUser.isPending}
          onOpenChange={(open) => !open && closeDelete()}
          onConfirm={async () => {
            if (selectedUserId == null) return;
            await deleteUser.mutateAsync(selectedUserId);
            setDeleteAction(null);
          }}
        />
      )}
    </div>
  );
}
