"use client";

import React from "react";

import { COMPANY_TYPE_META, type CompanyType } from "@/entities/company";
import { USER_ROLE_META, UserRoles } from "@/entities/user";

interface DirectoryItem {
  id: number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export default function DirectoryPage() {
  const rolesData: DirectoryItem[] = (Object.keys(USER_ROLE_META) as UserRoles[]).map((key, index) => ({
    id: index + 1,
    ...USER_ROLE_META[key],
  }));

  const companiesData: DirectoryItem[] = (Object.keys(COMPANY_TYPE_META) as CompanyType[]).map((key, index) => ({
    id: index + 1,
    ...COMPANY_TYPE_META[key],
  }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <DirectoryTable data={rolesData} />
      <DirectoryTable data={companiesData} />
    </div>
  );
}

// --- Ультра-компактная таблица без заголовка ---

function DirectoryTable({ data }: { data: DirectoryItem[] }) {
  return (
    <div className="border-border/40 bg-background/30 overflow-hidden rounded-lg border shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-border/40 bg-muted/10 border-b">
            <th className="text-muted-foreground/60 w-12 px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase">
              №
            </th>
            <th className="text-muted-foreground/60 px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase">
              Наименование
            </th>
          </tr>
        </thead>
        <tbody className="divide-border/30 divide-y">
          {data.map((item) => (
            <tr key={item.id} className="group hover:bg-secondary/30 transition-colors">
              <td className="px-3 py-1.5">
                <span className="text-muted-foreground/50 group-hover:text-primary/70 font-mono text-[10px] font-medium transition-colors">
                  {String(item.id).padStart(2, "0")}
                </span>
              </td>

              <td className="px-3 py-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="bg-muted/30 text-muted-foreground/50 group-hover:bg-primary/10 group-hover:text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors">
                    <item.Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-foreground/80 group-hover:text-foreground text-[12px] font-medium transition-colors">
                    {item.label}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
