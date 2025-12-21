import { useState } from "react";

import { toast } from "sonner";

import { usersService } from "@/features/users/api/users";
import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === "true";

interface UseUserActionsProps {
  onUsersUpdate?: (updater: (users: User[]) => User[]) => void;
}

export function useUserActions({ onUsersUpdate }: UseUserActionsProps = {}) {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = async (id: number) => {
    if (IS_DEMO) {
      toast.info("Удаление недоступно в демо режиме");
      return;
    }

    try {
      await usersService.deleteUser(id);
      onUsersUpdate?.((users) => users.filter((u) => u.id !== id));
      toast.success("Пользователь удален");
    } catch {
      toast.error("Ошибка при удалении пользователя");
    }
  };

  const handleStatusChange = async (id: number, status: UserStatus) => {
    if (IS_DEMO) {
      toast.info("Изменение статуса недоступно в демо режиме");
      return;
    }

    try {
      await usersService.changeStatus(id, status);
      onUsersUpdate?.((users) => users.map((u) => (u.id === id ? { ...u, status } : u)));
      toast.success("Статус обновлен");
    } catch {
      toast.error("Ошибка при изменении статуса");
    }
  };

  const handleRoleChange = async (id: number, role: UserRole) => {
    if (IS_DEMO) {
      toast.info("Изменение роли недоступно в демо режиме");
      return;
    }

    try {
      await usersService.changeRole(id, role);
      onUsersUpdate?.((users) => users.map((u) => (u.id === id ? { ...u, role } : u)));
      toast.success("Роль обновлена");
    } catch {
      toast.error("Ошибка при изменении роли");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSaveEdit = async (updates: { role: UserRole; status: UserStatus }) => {
    if (!editingUser) return;

    const promises: Promise<void>[] = [];

    if (updates.role !== editingUser.role) {
      promises.push(handleRoleChange(editingUser.id, updates.role));
    }

    if (updates.status !== editingUser.status) {
      promises.push(handleStatusChange(editingUser.id, updates.status));
    }

    await Promise.all(promises);
    setEditingUser(null);
  };

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
