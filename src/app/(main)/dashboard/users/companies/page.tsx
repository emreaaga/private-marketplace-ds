"use client";

import { useCallback, useMemo, useState } from "react";

import { useCompaniesList } from "@/features/companies/queries/use-companies-list";
import { useUpdateCompany } from "@/features/companies/queries/use-update-company";
import { createCompaniesColumns } from "@/features/companies/ui/organisms/companies-columns";
import { CompanyEditDialog } from "@/features/companies/ui/organisms/company-edit-dialog";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import type { Company } from "@/shared/types/company/company.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));

export default function CompaniesMainPage() {
  const [page, setPage] = useState(1);

  const [editOpen, setEditOpen] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState<number | null>(null);

  const { data, isLoading, isError } = useCompaniesList({ page });

  const companies = data?.data ?? [];
  const pageCount = data?.pagination.totalPages ?? 1;

  const updateCompany = useUpdateCompany();

  const openEdit = useCallback((company: Company) => {
    setEditCompanyId(company.id);
    setEditOpen(true);
  }, []);

  const closeEdit = useCallback(() => {
    setEditOpen(false);
    setTimeout(() => setEditCompanyId(null), 200);
  }, []);

  const columns = useMemo(
    () =>
      createCompaniesColumns({
        onView: openEdit,
      }),
    [openEdit],
  );

  const emptyMessage = isLoading ? "Загрузка..." : isError ? "Не удалось загрузить компании" : "Компании не найдены";

  const onPageChange = (next: number) => {
    setPage((prev) => {
      const safeMax = Math.max(1, pageCount);
      const clamped = clamp(next, 1, safeMax);
      return prev === clamped ? prev : clamped;
    });
  };

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

      <CompanyEditDialog
        open={editOpen}
        companyId={editCompanyId}
        pending={updateCompany.isPending}
        onOpenChange={(open) => !open && closeEdit()}
        onSubmitAction={(id, values) => updateCompany.mutateAsync({ id, values })}
      />
    </div>
  );
}
