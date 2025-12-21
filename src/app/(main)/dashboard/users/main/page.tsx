"use client";

import { useUserActions } from "@/features/users/hooks/use-user-actions";
import { useUsers } from "@/features/users/hooks/use-users";
import { User, USER_ROLES } from "@/features/users/types/user.types";
import { EditUserForm } from "@/features/users/ui/organisms/forms/edit-user";
import { UsersListResponsive } from "@/features/users/ui/organisms/lists/user-responsive";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";

export const mockUsers: User[] = [
  {
    id: 1,
    public_id: "A01",
    name: "pochta1",
    email: "pochta1@example.com",
    role: USER_ROLES.ADMIN,
    status: "active",
    created_at: "2024-01-10T09:12:33Z",
  },
  {
    id: 2,
    public_id: "A02",
    name: "pochta2",
    email: "pochta2@example.com",
    role: USER_ROLES.ADMIN,
    status: "active",
    created_at: "2024-02-05T14:45:10Z",
  },
  {
    id: 3,
    public_id: "B100",
    name: "prodavec1",
    email: "prodavec1@example.com",
    role: USER_ROLES.SELLER,
    status: "pending",
    created_at: "2024-02-20T11:03:54Z",
  },
  {
    id: 4,
    public_id: "B101",
    name: "prodavec2",
    email: "prodavec2@example.com",
    role: USER_ROLES.SELLER,
    status: "active",
    created_at: "2024-03-01T08:20:00Z",
  },
  {
    id: 5,
    public_id: "B103",
    name: "prodavec3",
    email: "prodavec3@example.com",
    role: USER_ROLES.SELLER,
    status: "blocked",
    created_at: "2024-03-10T16:37:41Z",
  },
  {
    id: 6,
    public_id: "C1001",
    name: "client1",
    email: "client1@example.com",
    role: USER_ROLES.CUSTOMER,
    status: "active",
    created_at: "2024-03-10T16:37:41Z",
  },
  {
    id: 7,
    public_id: "C1002",
    name: "prodavec3",
    email: "prodavec3@example.com",
    role: USER_ROLES.CUSTOMER,
    status: "blocked",
    created_at: "2024-03-10T16:37:41Z",
  },
  {
    id: 8,
    public_id: "C1003",
    name: "prodavec3",
    email: "prodavec3@example.com",
    role: USER_ROLES.CUSTOMER,
    status: "blocked",
    created_at: "2024-03-10T16:37:41Z",
  },
  {
    id: 9,
    public_id: "C1004",
    name: "prodavec3",
    email: "prodavec3@example.com",
    role: USER_ROLES.CUSTOMER,
    status: "blocked",
    created_at: "2024-03-10T16:37:41Z",
  },
  {
    id: 10,
    public_id: "C1005",
    name: "prodavec3",
    email: "prodavec3@example.com",
    role: USER_ROLES.CUSTOMER,
    status: "blocked",
    created_at: "2024-03-10T16:37:41Z",
  },
];

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
      <div className="p-2">
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
