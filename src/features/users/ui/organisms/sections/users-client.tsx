"use client";

import dynamic from "next/dynamic";

import { useUserActions } from "@/features/users/hooks/use-user-actions";
import { useUsers } from "@/features/users/hooks/use-users";
import type { User } from "@/features/users/types/user.types";
import { UsersListResponsive } from "@/features/users/ui/organisms/lists/user-responsive";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";

const EditUserForm = dynamic(() => import("@/features/users/ui/organisms/forms/edit-user"), {
  ssr: false,
  loading: () => null,
});

interface UsersClientProps {
  initialUsers: User[];
}

export function UsersClient({ initialUsers }: UsersClientProps) {
  const { users, setUsers } = useUsers(initialUsers);

  const {
    editingUser,
    setEditingUser,
    handleDelete,
    handleStatusChange,
    handleRoleChange,
    handleEdit,
    handleSaveEdit,
  } = useUserActions({
    onUsersUpdate: setUsers,
  });

  return (
    <>
      <UsersToolbar />

      <UsersListResponsive
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
      />

      {editingUser && (
        <EditUserForm
          user={editingUser}
          open
          onOpenChange={(open) => {
            if (!open) setEditingUser(null);
          }}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}
