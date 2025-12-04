"use client";

import { useUserActions } from "@/features/users/hooks/use-user-actions";
import { useUsers } from "@/features/users/hooks/use-users";
import { EditUserForm } from "@/features/users/ui/organisms/forms/edit-user";
import { UsersListResponsive } from "@/features/users/ui/organisms/lists/user-responsive";

export default function UsersPage() {
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
      <div className="p-2">
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 sm:p-2">
      <h2 className="mb-2 text-xl font-bold tracking-tight">Админ панель</h2>

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
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
