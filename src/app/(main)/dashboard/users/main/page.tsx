"use client";

import { lazy, Suspense } from "react";

import { mockUsers } from "@/features/users/fake-users";
import { useUserActions } from "@/features/users/hooks/use-user-actions";
import { useUsers } from "@/features/users/hooks/use-users";
import { UsersListResponsive } from "@/features/users/ui/organisms/lists/user-responsive";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";

const EditUserForm = lazy(() => import("@/features/users/ui/organisms/forms/edit-user"));

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UsersToolbar />
      <UsersListResponsive
        users={mockUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRoleChange={handleRoleChange}
        onStatusChange={handleStatusChange}
      />

      {editingUser && (
        <Suspense fallback={null}>
          <EditUserForm
            user={editingUser}
            open={!!editingUser}
            onOpenChange={(open) => !open && setEditingUser(null)}
            onSave={handleSaveEdit}
          />
        </Suspense>
      )}
    </div>
  );
}
