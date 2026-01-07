"use client";

import { ColumnDef } from "@tanstack/react-table";

import { GeneralSettingsRoleToolbar } from "@/features/general-settings/ui/organisms/sections/general-settings-role-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

type User = {
  id: number;
  role: string;
  name: string;
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "role",
    header: "Роль",
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
];

const mockData: User[] = [
  { id: 1, role: "A", name: "Почта" },
  { id: 2, role: "B", name: "Продавец" },
  { id: 3, role: "C", name: "Клиент" },
  { id: 4, role: "D", name: "Курьер" },
  { id: 5, role: "E", name: "Самолет" },
  { id: 6, role: "F", name: "Деклорант" },
];

export default function Test1Page() {
  return (
    <div className="space-y-4">
      <GeneralSettingsRoleToolbar />
      <DataTable columns={columns} data={mockData} emptyMessage="Пока нет записей" />
    </div>
  );
}
