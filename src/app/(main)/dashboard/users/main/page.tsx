"use client";
import { useEffect, useState } from "react";

import { usersService } from "@/features/users/api/users";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { usersColumns } from "@/features/users/ui/organisms/users-columns";
import type { User } from "@/shared/types/users/user.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export default function UsersMainPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    usersService
      .getUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <UsersToolbar />
      <DataTable
        columns={usersColumns}
        data={users}
        emptyMessage={loading ? "Загрузка..." : "Пользователи не найдены"}
      />
    </div>
  );
}
