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

function SimpleDirectoryList({ title, data }: SimpleTableProps) {
  return (
    <div className="border-border/50 bg-background/50 hover:border-border/80 flex flex-col gap-4 rounded-xl border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-colors">
      <h3 className="text-muted-foreground/70 px-1 text-[10px] font-bold tracking-[0.2em] uppercase">{title}</h3>

      <div className="space-y-0.5">
        {data.map((item) => (
          <div
            key={item.number}
            className="group hover:bg-secondary/60 flex items-center gap-4 rounded-md px-2 py-1.5 transition-colors"
          >
            <span className="text-muted-foreground/60 group-hover:text-primary/80 w-5 shrink-0 font-mono text-[11px] font-medium transition-colors">
              {String(item.number).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-3">
              <div className="bg-muted/40 text-muted-foreground/60 group-hover:bg-primary/10 group-hover:text-primary flex h-7 w-7 items-center justify-center rounded-lg transition-colors">
                <item.Icon className="h-4 w-4" />
              </div>

              <span className="text-foreground/90 group-hover:text-foreground text-[13px] font-medium transition-colors">
                {item.label}
              </span>
            </div>
          </div>
        ))}
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
    <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:gap-8">
      <SimpleDirectoryList title="Роли пользователей" data={rolesData} />
      <SimpleDirectoryList title="Типы компаний" data={companyTypesData} />
    </div>
  );
}
