"use client";

import { useEffect, useState } from "react";

import { companiesService } from "@/features/companies/api/companies";
import { companiesColumns } from "@/features/companies/ui/organisms/companies-columns";
import { UsersToolbar } from "@/features/users/ui/organisms/sections/users-toolbar";
import type { Company } from "@/shared/types/company/company.model";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

export default function CompaniesMainPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    companiesService
      .getCompanies()
      .then(setCompanies)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <UsersToolbar />

      <DataTable
        columns={companiesColumns}
        data={companies}
        emptyMessage={loading ? "Загрузка..." : "Компании не найдены"}
      />
    </div>
  );
}
