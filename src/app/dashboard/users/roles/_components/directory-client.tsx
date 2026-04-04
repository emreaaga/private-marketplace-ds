"use client";

import { useMemo } from "react";

import { DataTable } from "@/widgets/data-table/ui/data-table";

import { createAllUsersColumns, DirectoryEntity } from "./all-roles-columns";

export function DirectoryClient({ initialData }: { initialData: DirectoryEntity[] }) {
  const columns = useMemo(
    () =>
      createAllUsersColumns({
        onView: (entity) => console.log("Viewing:", entity),
      }),
    [],
  );

  return <DataTable columns={columns} data={initialData} />;
}
