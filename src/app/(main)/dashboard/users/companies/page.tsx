"use client";

import { useMemo, useState } from "react";

import { useCompaniesList } from "@/features/companies/queries/use-companies-list";
import { companiesColumns } from "@/features/companies/ui/organisms/companies-columns";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function CompaniesMainPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useCompaniesList({ page });

  const companies = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const emptyMessage = isLoading ? "Загрузка..." : isError ? "Не удалось загрузить компании" : "Компании не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

  const columns = useMemo(() => companiesColumns, []);

  return (
    <div className="space-y-4">
      <UsersToolbar />

      <DataTable
        columns={columns}
        data={companies}
        emptyMessage={emptyMessage}
        serverPagination={{ page, pageCount, onPageChange }}
        fixedPageSize={10}
      />
    </div>
  );
}
