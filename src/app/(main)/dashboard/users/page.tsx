"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { usersService } from "@/services/users";
import type { User } from "@/types/users";

import { MOCK_USERS } from "./_components/fake-users";
import { UsersTable } from "./_components/users-table";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === "true";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(() => (IS_DEMO ? MOCK_USERS : []));

  useEffect(() => {
    if (!IS_DEMO) {
      usersService.getUsers().then((res) => setUsers(res));
    }
  }, []);

  const handleDelete = async (id: number) => {
    if (IS_DEMO) {
      toast.info("Удаление недоступно в демо режиме");
      return;
    }
  };

  const handleStatusChange = async (id: number, status: User["status"]) => {
    if (IS_DEMO) {
      toast.info("Изменение статуса недоступно в демо режиме");
      return;
    }
  };

  const handleRoleChange = async (id: number, role: User["role"]) => {
    if (IS_DEMO) {
      toast.info("Изменение роли недоступно в демо режиме");
      return;
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
