"use client";

import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { EditUserForm } from "@/features/users/ui/organisms/forms/edit-user";
import { UsersListResponsive } from "@/features/users/ui/organisms/lists/user-responsive";

interface ClientsUsersSectionProps {
  users: User[];
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => Promise<void>;
  handleRoleChange: (id: number, role: UserRole) => Promise<void>;
  handleStatusChange: (id: number, status: UserStatus) => Promise<void>;
  handleSaveEdit: (updates: { role: UserRole; status: UserStatus }) => Promise<void>;
}

export function ClientsUsersSection({
  users,
  editingUser,
  setEditingUser,
  handleEdit,
  handleDelete,
  handleRoleChange,
  handleStatusChange,
  handleSaveEdit,
}: ClientsUsersSectionProps) {
  return (
    <>
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
    </>
  );
}
