"use client";

import { CountryCode } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";
import { ScrollArea } from "@/shared/ui/atoms/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

import { CompanyType } from "../model/company.types";
import { useCompaniesLookup } from "../queries/use-companies-lookup";

interface CompanySelectProps {
  value?: number;
  onChange: (value?: number) => void;
  onSelectName?: (name: string) => void;
  type?: CompanyType;
  country?: CountryCode;
  placeholder?: string;
  error?: boolean;
  className?: string;
  enabled?: boolean;
}

export function CompanySelect({
  value,
  onChange,
  onSelectName,
  type,
  country,
  placeholder,
  error,
  className,
  enabled = true,
}: CompanySelectProps) {
  const {
    data: companies = [],
    isLoading,
    isError,
  } = useCompaniesLookup({
    type,
    country,
    enabled,
  });

  const emptyLabel = isLoading ? "Загрузка..." : isError ? "Не удалось загрузить" : "Компании не найдены";

  const handleValueChange = (v: string) => {
    if (v === "" || v === "__empty") {
      onChange(undefined);
      onSelectName?.("");
      return;
    }

    const id = Number(v);
    const safeId = Number.isFinite(id) ? id : undefined;

    onChange(safeId);

    if (safeId !== undefined && onSelectName) {
      const selectedCompany = companies.find((c) => c.id === safeId);
      if (selectedCompany) {
        onSelectName(selectedCompany.name);
      }
    }
  };

  return (
    <Select
      value={value == null ? "" : String(value)}
      onValueChange={handleValueChange}
      disabled={!enabled || isLoading}
    >
      <SelectTrigger
        className={cn(
          "h-9 w-full rounded-md border-zinc-200 bg-white px-3 py-2 text-[13px] transition-all",
          "shadow-sm placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-0 focus:outline-none",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
          !enabled && "cursor-not-allowed bg-zinc-50 opacity-60",
          className,
        )}
      >
        <SelectValue placeholder={!enabled ? "Выберите страну" : (placeholder ?? "Выберите компанию")} />
      </SelectTrigger>

      <SelectContent className="min-w-50 overflow-hidden rounded-lg border-zinc-200 p-0 shadow-xl">
        <ScrollArea className="h-full max-h-70">
          {companies.length === 0 ? (
            <div className="py-6 text-center text-[12px] font-medium text-zinc-400">{emptyLabel}</div>
          ) : (
            <div className="p-1">
              {companies.map((company) => (
                <SelectItem
                  key={company.id}
                  value={String(company.id)}
                  className="cursor-default rounded-md px-2 py-2 text-[12px] transition-colors focus:bg-zinc-100 focus:text-zinc-900"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-medium tracking-tighter text-zinc-400">
                      {String(company.id).padStart(3, "0")}
                    </span>
                    <span className="h-3 w-px bg-zinc-200" />
                    <span className="truncate font-medium text-zinc-700">{company.name}</span>
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
