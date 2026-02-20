"use client";

import { Building2 } from "lucide-react";

import { useCompaniesLookup } from "@/features/companies/queries/use-companies-lookup";
import { cn } from "@/shared/lib/utils";
import type { CompanyType } from "@/shared/types/company/company.types";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

interface CompanySelectProps {
  value?: number;
  onChange: (value?: number) => void;
  type?: CompanyType;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export function CompanySelect({ value, onChange, type, placeholder, error, className }: CompanySelectProps) {
  const { data: companies = [], isLoading, isError } = useCompaniesLookup({ type });

  const emptyLabel = isLoading ? "Загрузка..." : isError ? "Не удалось загрузить" : "Компании не найдены";

  return (
    <Select
      value={value == null ? "" : String(value)}
      onValueChange={(v) => {
        if (v === "") return onChange(undefined);

        const id = Number(v);
        onChange(Number.isFinite(id) ? id : undefined);
      }}
    >
      <SelectTrigger
        className={cn(
          "w-full",
          error && "border-destructive focus:ring-destructive",
          className, // Передаем className в триггер
        )}
      >
        <SelectValue placeholder={placeholder ?? "Компания"} />
      </SelectTrigger>

      <SelectContent className="p-0">
        <ScrollArea className="h-45">
          {companies.length === 0 ? (
            <div className="p-2">
              <SelectItem value="__empty" disabled>
                {emptyLabel}
              </SelectItem>
            </div>
          ) : (
            <div className="p-1">
              {companies.map((company) => (
                <SelectItem key={company.id} value={String(company.id)}>
                  <div className="flex items-center gap-2">
                    <Building2 className="text-muted-foreground h-4 w-4" />
                    <span className="truncate">{company.name}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          )}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
