// src/features/clients/model/use-clients-page-state.ts
"use client";

import { useUserActions } from "@/features/users/hooks/use-user-actions";
import { useUsers } from "@/features/users/hooks/use-users";

export function useClientsPageState() {
  const { users, setUsers } = useUsers();

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

  return {
    users,
    editingUser,
    setEditingUser,
    handleDelete,
    handleStatusChange,
    handleRoleChange,
    handleEdit,
    handleSaveEdit,
  };
}
