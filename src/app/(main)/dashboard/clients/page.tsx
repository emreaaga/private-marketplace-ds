"use client";

import { AccessSettingsCard } from "@/features/clients/ui/organisms/access-settings-card";
import { StoreLinkCard } from "@/features/clients/ui/organisms/store-link-card";
import { useUserActions } from "@/features/users/hooks/use-user-actions";
import { useUsers } from "@/features/users/hooks/use-users";
import { EditUserForm } from "@/features/users/ui/organisms/forms/edit-user";
import { UsersListResponsive } from "@/features/users/ui/organisms/lists/user-responsive";

export default function ClientsPage() {
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
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Клиенты и доступ</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Управляйте доступом клиентов к вашему приватному каталогу.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StoreLinkCard />
        <AccessSettingsCard />
      </div>

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
