"use client";

import { MoreHorizontal, User } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { ALL_USER_ROLE_META } from "@/shared/types/users";

interface Employee {
  id: number;
  name: string;
  role: string;
  status: "active" | string;
}

interface CompanyEmployeesListProps {
  employees: Employee[];
  total: number;
}

export function CompanyEmployeesList({ employees, total }: CompanyEmployeesListProps) {
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted/50 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
          <User className="text-muted-foreground/50 h-6 w-6" />
        </div>
        <p className="text-foreground text-sm font-medium">Сотрудников пока нет</p>
        <p className="text-muted-foreground text-xs">Добавьте первого сотрудника</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
          Всего сотрудников — {total}
        </h3>
      </div>

      <div className="divide-border/40 bg-background/50 divide-y rounded-lg border">
        {employees.map((employee) => {
          const roleMeta = ALL_USER_ROLE_META[employee.role as keyof typeof ALL_USER_ROLE_META];
          const RoleIcon = roleMeta?.Icon || User;
          const isActive = employee.status === "active";
          const statusDisplayName = isActive ? "Активен" : "Неактивен";

          return (
            <div
              key={employee.id}
              className="group hover:bg-muted/40 flex items-center justify-between p-2.5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-secondary text-muted-foreground flex h-8 w-8 items-center justify-center rounded-md border text-[13px] font-semibold uppercase">
                  {employee.name.slice(0, 1)}
                </div>

                <div className="flex flex-col">
                  <span className="text-[13px] leading-none font-medium tracking-tight">{employee.name}</span>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <RoleIcon className="text-muted-foreground/50 h-3 w-3" />
                    <span className="text-muted-foreground text-[11px] font-medium">
                      {roleMeta?.label || employee.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={cn("h-1.5 w-1.5 shrink-0 rounded-full", isActive ? "bg-emerald-500" : "bg-red-500")}
                  />
                  <span className="text-foreground text-[13px] font-medium tracking-tight" title={employee.status}>
                    {statusDisplayName}
                  </span>
                </div>

                <button className="text-muted-foreground/30 hover:text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
