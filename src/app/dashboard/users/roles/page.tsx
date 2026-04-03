"use client";

import React from "react";

import { COMPANY_TYPE_META, type CompanyType } from "@/entities/company";
import { USER_ROLE_META, UserRoles } from "@/entities/user";

interface DirectoryItem {
  label: string;
  category: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export default function DirectoryPage() {
  // Собираем все данные в один массив
  const unifiedData: DirectoryItem[] = [
    ...(Object.keys(USER_ROLE_META) as UserRoles[]).map((key) => ({
      ...USER_ROLE_META[key],
      category: "Роль",
    })),
    ...(Object.keys(COMPANY_TYPE_META) as CompanyType[]).map((key) => ({
      ...COMPANY_TYPE_META[key],
      category: "Компания",
    })),
  ];

  return (
    <div className="space-y-4">
      <div className="border-border/40 bg-background/30 overflow-hidden rounded-lg border shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-border/40 bg-muted/10 border-b">
              <th className="text-muted-foreground/60 w-12 px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase">
                №
              </th>
              <th className="text-muted-foreground/60 w-24 px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase">
                Тип
              </th>
              <th className="text-muted-foreground/60 px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase">
                Наименование
              </th>
            </tr>
          </thead>
          <tbody className="divide-border/30 divide-y">
            {unifiedData.map((item, index) => (
              <tr key={index} className="group hover:bg-secondary/30 transition-colors">
                {/* Сквозной номер */}
                <td className="px-3 py-1.5">
                  <span className="text-muted-foreground/50 group-hover:text-primary/70 font-mono text-[10px] font-medium transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </td>

                {/* Тонкая метка категории */}
                <td className="px-3 py-1.5">
                  <span className="text-muted-foreground/40 text-[9px] font-bold tracking-tight uppercase">
                    {item.category}
                  </span>
                </td>

                {/* Иконка + Название */}
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
    </div>
  );
}
