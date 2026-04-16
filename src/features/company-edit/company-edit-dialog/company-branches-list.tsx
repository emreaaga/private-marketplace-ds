"use client";

import { useState } from "react";

import { BadgeCheckIcon, Building2, Loader2, MapPin, MoreHorizontal, Plus, X } from "lucide-react";

import { Branch, CreateBranchForm, useCompanyBranches } from "@/entities/branch";
import { type CountryCode } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";

type Props = {
  companyId: number | null;
  defaultCountry: CountryCode | null | undefined;
};

export function CompanyBranchesList({ companyId, defaultCountry }: Props) {
  const { data: branches, isLoading, isError } = useCompanyBranches(companyId);
  const [isAdding, setIsAdding] = useState(false);

  const toggleAdding = () => setIsAdding((prev) => !prev);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-10">
        <Loader2 className="text-muted-foreground/30 h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-destructive py-10 text-center text-sm font-medium">Ошибка загрузки филиалов</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase">
          Всего филиалов — {branches?.length || 0}
        </h3>

        {companyId && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 rounded-md transition-all",
              isAdding ? "bg-muted text-foreground" : "hover:bg-primary/10 hover:text-primary text-muted-foreground",
            )}
            onClick={toggleAdding}
            title={isAdding ? "Закрыть форму" : "Добавить филиал"}
          >
            {isAdding ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {isAdding && companyId && (
        <CreateBranchForm
          companyId={companyId}
          initialCountry={defaultCountry}
          onCloseAction={() => setIsAdding(false)}
        />
      )}

      {!branches?.length ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted/50 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <Building2 className="text-muted-foreground/50 h-6 w-6" />
          </div>
          <p className="text-foreground text-sm font-medium">Филиалов пока нет</p>
          <p className="text-muted-foreground text-xs">Нажмите на плюс, чтобы добавить первый</p>
        </div>
      ) : (
        <div className="divide-border/40 bg-background/50 divide-y rounded-lg border">
          {branches.map((branch: Branch) => {
            const isActive = branch.is_active;
            const statusDisplayName = isActive ? "Активен" : "Неактивен";

            return (
              <div
                key={branch.id}
                className="group hover:bg-muted/40 flex items-center justify-between p-2.5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md border text-[13px] font-semibold uppercase",
                      branch.is_main
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {branch.name.slice(0, 1)}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] leading-none font-medium tracking-tight">{branch.name}</span>
                      {branch.is_main && (
                        <div className="text-primary flex items-center" title="Главный филиал">
                          <BadgeCheckIcon className="text-muted-foreground h-3.5 w-3.5" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <MapPin className="text-muted-foreground/50 h-3 w-3" />
                      <span className="text-muted-foreground text-[11px] font-medium uppercase">
                        {branch.country}, {branch.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn("h-1.5 w-1.5 shrink-0 rounded-full", isActive ? "bg-emerald-500" : "bg-red-500")}
                    />
                    <span className="text-foreground text-[13px] font-medium tracking-tight">{statusDisplayName}</span>
                  </div>

                  <button className="text-muted-foreground/30 hover:text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
