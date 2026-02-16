"use client";

import { useMemo, useState } from "react";

import { useServicesList } from "@/features/services/queries/use-services-list";
import { servicesColumns } from "@/features/services/ui/organisms/services-columns";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function ServicesPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useServicesList({ page });

  const services = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const emptyMessage = isLoading ? "Загрузка..." : isError ? "Не удалось загрузить сервисы" : "Сервисы не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  const columns = useMemo(() => servicesColumns, []);

  return (
    <div className="space-y-4">
      <UsersToolbar />

      <DataTable
        columns={columns}
        data={services}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />
    </div>
  );
}
