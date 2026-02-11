"use client";

import { useEffect, useMemo, useState } from "react";

import { usersService } from "@/features/users/api/users";
import { DeleteUserDialog } from "@/features/users/ui/organisms/dialogs/delete-user/delete-user-dialog";
import { EditUserDialog } from "@/features/users/ui/organisms/dialogs/edit-user/edit-user-dialog";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { createUsersColumns } from "@/features/users/ui/organisms/users-columns";
import type { User } from "@/shared/types/users/user.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

type UserActionMode = "edit" | "delete" | null;

export default function UsersMainPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<UserActionMode>(null);

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    usersService
      .getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const columns = useMemo(
    () =>
      createUsersColumns({
        onEdit: (user) => {
          setSelectedUserId(user.id);
          setSelectedUserName(user.name);
          setMode("edit");
        },
        onDelete: (user) => {
          setSelectedUserId(user.id);
          setSelectedUserName(user.name);
          setDeleteError(null);
          setMode("delete");
        },
      }),
    [],
  );

  const close = () => {
    if (deleting) return;
    setMode(null);
    setSelectedUserId(null);
    setSelectedUserName(undefined);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async (id: number) => {
    if (deleting) return;

    setDeleting(true);
    setDeleteError(null);

    const prev = users;
    setUsers((cur) => cur.filter((u) => u.id !== id));

    try {
      await usersService.deleteUser(id);
      setMode(null);
      setSelectedUserId(null);
      setSelectedUserName(undefined);
    } catch {
      setUsers(prev);
      setDeleteError("Не удалось удалить пользователя. Попробуйте снова.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <UsersToolbar />

      <DataTable columns={columns} data={users} emptyMessage={loading ? "Загрузка..." : "Пользователи не найдены"} />

      <EditUserDialog
        open={mode === "edit"}
        userId={selectedUserId}
        onOpenChange={(open) => !open && setMode(null)}
        onSubmit={(id, values) => {
          console.log("submit edit", id, values);
        }}
      />

      <DeleteUserDialog
        open={mode === "delete"}
        userId={selectedUserId}
        userName={selectedUserName}
        onOpenChange={(open) => !open && close()}
        onConfirm={handleDeleteConfirm}
        pending={deleting}
        error={deleteError}
      />
    </div>
  );
}
