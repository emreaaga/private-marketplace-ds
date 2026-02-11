"use client";

import { Building2 } from "lucide-react";

import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { CompanyType } from "@/shared/types/company/company.types";
import { Select, SelectTrigger } from "@/shared/ui/atoms/select";

export function CompanyReadonlySelect({
  companyName,
  companyType,
}: {
  companyName?: string;
  companyType?: CompanyType;
}) {
  const meta = companyType ? COMPANY_TYPE_META[companyType] : null;
  const Icon = meta?.Icon ?? Building2;

  return (
    <Select disabled value="__readonly">
      <SelectTrigger className="w-full" disabled>
        <div className="flex w-full items-center gap-2 overflow-hidden">
          <Icon className="text-muted-foreground h-4 w-4 shrink-0" />
          <span className="truncate">{companyName ?? meta?.label ?? "Компания"}</span>
        </div>
      </SelectTrigger>
    </Select>
  );
}
