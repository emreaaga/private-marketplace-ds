"use client";

import { useCallback, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { useUpdateUser } from "@/features/users/mutations/use-update-user";
import { useUsersList } from "@/features/users/queries/use-users-list";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { createUsersColumns } from "@/features/users/ui/organisms/users-columns";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

const EditUserDialog = dynamic(
  () => import("@/features/users/ui/organisms/dialogs/edit-user/edit-user-dialog").then((m) => m.EditUserDialog),
  { ssr: false },
);

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function UsersMainPage() {
  const [page, setPage] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const { data, isLoading, isError } = useUsersList({ page });
  const users = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const updateUser = useUpdateUser();

  const openEdit = useCallback((id: number) => {
    setEditUserId(id);
    setEditOpen(true);
  }, []);

  const closeEdit = () => {
    setEditOpen(false);
    setEditUserId(null);
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
      }),
    [openEdit],
  );

  const emptyMessage = isLoading
    ? "Загрузка..."
    : isError
      ? "Не удалось загрузить пользователей"
      : "Пользователи не найдены";

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
    </div>
  );
}
