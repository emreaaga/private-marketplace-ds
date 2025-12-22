import { useState, useCallback } from "react";

import { usersService } from "@/features/users/api/users";
import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";

interface UseUserActionsProps {
  onUsersUpdate?: (updater: (users: User[]) => User[]) => void;
}

export function useUserActions({ onUsersUpdate }: UseUserActionsProps = {}) {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await usersService.deleteUser(id);
        onUsersUpdate?.((users) => users.filter((u) => u.id !== id));

        const { toast } = await import("sonner");
        toast.success("Пользователь удален");
      } catch (error) {
        const { toast } = await import("sonner");
        toast.error("Ошибка при удалении пользователя");
        console.error("Delete user error:", error);
      }
    },
    [onUsersUpdate],
  );

  const handleStatusChange = useCallback(
    async (id: number, status: UserStatus) => {
      try {
        await usersService.changeStatus(id, status);
        onUsersUpdate?.((users) => users.map((u) => (u.id === id ? { ...u, status } : u)));

        const { toast } = await import("sonner");
        toast.success("Статус обновлен");
      } catch (error) {
        const { toast } = await import("sonner");
        toast.error("Ошибка при изменении статуса");
        console.error("Change status error:", error);
      }
    },
    [onUsersUpdate],
  );

  const handleRoleChange = useCallback(
    async (id: number, role: UserRole) => {
      try {
        await usersService.changeRole(id, role);
        onUsersUpdate?.((users) => users.map((u) => (u.id === id ? { ...u, role } : u)));

        const { toast } = await import("sonner");
        toast.success("Роль обновлена");
      } catch (error) {
        const { toast } = await import("sonner");
        toast.error("Ошибка при изменении роли");
        console.error("Change role error:", error);
      }
    },
    [onUsersUpdate],
  );

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
  }, []);

  const handleSaveEdit = useCallback(
    async (updates: { role: UserRole; status: UserStatus }) => {
      if (!editingUser) return;

      const promises: Promise<void>[] = [];

      if (updates.role !== editingUser.role) {
        promises.push(handleRoleChange(editingUser.id, updates.role));
      }

      if (updates.status !== editingUser.status) {
        promises.push(handleStatusChange(editingUser.id, updates.status));
      }

      try {
        await Promise.all(promises);
        setEditingUser(null);
      } catch (error) {
        console.error("Save edit error:", error);
      }
    },
    [editingUser, handleRoleChange, handleStatusChange],
  );

  return {
    editingUser,
    setEditingUser,
    handleDelete,
    handleStatusChange,
    handleRoleChange,
    handleEdit,
    handleSaveEdit,
  };
}
