import React from "react";

import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import { CompanyType } from "@/shared/types/company/company.types";
import { USER_ROLE_META } from "@/shared/types/users";
import { UserRoles } from "@/shared/types/users/user.model";

interface DirectoryItem {
  number: number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface SimpleTableProps {
  title: string;
  data: DirectoryItem[];
}

function SimpleTable({ title, data }: SimpleTableProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-muted-foreground px-1 text-[10px] font-bold tracking-widest uppercase">{title}</h2>
      <div className="border-border overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-border border-b text-[11px]">
            <tr>
              <th className="text-muted-foreground h-8 w-12 px-3 text-left font-semibold uppercase">ID</th>
              <th className="text-muted-foreground h-8 px-3 text-left font-semibold uppercase">Название</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {data.map((item) => (
              <tr key={item.number} className="hover:bg-muted/20 transition-colors">
                <td className="text-muted-foreground w-12 px-3 py-2 text-xs">{item.number}</td>
                <td className="px-3 py-1">
                  <div className="flex items-center gap-2">
                    <item.Icon className="text-primary/80 h-3.5 w-3.5" />
                    <span className="text-xs leading-none">{item.label}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  const rolesData: DirectoryItem[] = (Object.keys(USER_ROLE_META) as UserRoles[]).map((key, index) => ({
    number: index + 1,
    ...USER_ROLE_META[key],
  }));

  const companyTypesData: DirectoryItem[] = (Object.keys(COMPANY_TYPE_META) as CompanyType[]).map((key, index) => ({
    number: index + 1,
    ...COMPANY_TYPE_META[key],
  }));

  return (
    <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 md:grid-cols-2">
      <SimpleTable title="Роли пользователей" data={rolesData} />
      <SimpleTable title="Типы компаний" data={companyTypesData} />
    </div>
  );
}
