"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { usersService } from "@/services/users";
import type { User } from "@/types/users";

import { UsersTable } from "./_components/users-table";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    usersService.getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await usersService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));

      toast.success("Пользователь успешно удален!");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при удалении пользователя");
    }
  };

  const handleStatusChange = async (id: number, status: User["status"]) => {
    try {
      await usersService.changeStatus(id, status);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
      toast.success("Статус пользователя успешно изменен!");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при изменении статуса пользователя");
    }
  };

  const handleRoleChange = async (id: number, role: User["role"]) => {
    try {
      await usersService.changeRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));

      toast.success("Роль пользователя успешно изменена!");
    } catch (error) {
      console.log(error);
      toast.error("Ошибка при изменении роли пользователя");
    }
  };

  return (
    <div className="p-6">
      <UsersTable
        users={users}
        handleDelete={handleDelete}
        handleRoleChange={handleRoleChange}
        handleStatusChange={handleStatusChange}
      />
    </div>
  );
}
