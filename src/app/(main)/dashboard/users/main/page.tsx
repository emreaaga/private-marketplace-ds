"use client";

import dynamic from "next/dynamic";

import { mockUsers } from "@/features/users/fake-users";
import { useUserActions } from "@/features/users/hooks/use-user-actions";
import { useUsers } from "@/features/users/hooks/use-users";
import { UsersListResponsive } from "@/features/users/ui/organisms/lists/user-responsive";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";

const EditUserForm = dynamic(() => import("@/features/users/ui/organisms/forms/edit-user"), {
  ssr: false,
  loading: () => null,
});

export default function UsersMainPage() {
  const { users, setUsers, isLoading } = useUsers();

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
    <div className="space-y-4">
      <UsersToolbar />
      <UsersListResponsive
        users={mockUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
      />

      {editingUser && (
        <EditUserForm
          user={editingUser}
          open={true}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
