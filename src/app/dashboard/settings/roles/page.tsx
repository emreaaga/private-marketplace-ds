"use client";

import { useMemo } from "react";

import { COMPANY_TYPE_META, CompanyType } from "@/entities/company";
import { USER_ROLE_META, UserRoles } from "@/entities/user";
import { DataTable } from "@/widgets/data-table/ui/data-table";

// Импортируем колонки, которые мы подготовили
import { directoryColumns, DirectoryEntity } from "./_components/directory-columns";

export default function DirectoryPage() {
  const data = useMemo<DirectoryEntity[]>(
    () => [
      ...(Object.keys(USER_ROLE_META) as UserRoles[]).map((key) => ({
        id: key,
        label: USER_ROLE_META[key].label,
        category: "Роль" as const,
        Icon: USER_ROLE_META[key].Icon,
        rawKey: key,
      })),
      ...(Object.keys(COMPANY_TYPE_META) as CompanyType[]).map((key) => ({
        id: key,
        label: COMPANY_TYPE_META[key].label,
        category: "Компания" as const,
        Icon: COMPANY_TYPE_META[key].Icon,
        rawKey: key,
      })),
    ],
    [],
  );

  return (
    <div className="space-y-4">
      {/* Поскольку это справочник, нам не нужна серверная пагинация.
        DataTable просто выведет все данные из массива data.
      */}
      <DataTable
        columns={directoryColumns}
        data={data}
        // Если данных мало, можно убрать пагинацию или оставить дефолтную клиентскую
      />
    </div>
  );
}
