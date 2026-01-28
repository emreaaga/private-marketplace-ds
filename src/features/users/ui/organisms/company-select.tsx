import { useEffect, useState } from "react";

import { Building2 } from "lucide-react";

import { companiesService } from "@/features/companies/api/companies";
import { cn } from "@/shared/lib/utils";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { Company } from "@/shared/types/company/company.model";
import type { CompanyType } from "@/shared/types/company/company.types";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/atoms/select";

interface CompanySelectProps {
  value?: number;
  onChange: (value?: number) => void;
  type?: CompanyType;
  placeholder?: string;
  error?: boolean;
}

export function CompanySelect({ value, onChange, type, placeholder, error }: CompanySelectProps) {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    companiesService.getCompanies({ type }).then(setCompanies);
  }, [type]);

  return (
    <Select value={value ? String(value) : undefined} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger className={cn("w-full", error && "border-destructive focus:ring-destructive")}>
        <SelectValue placeholder={placeholder ?? "Компания"} />
      </SelectTrigger>

      <SelectContent>
        {companies.map((company) => {
          const meta = COMPANY_TYPE_META[company.type];
          const Icon = meta?.Icon ?? Building2;

          return (
            <SelectItem key={company.id} value={String(company.id)}>
              <div className="flex items-center gap-2">
                <Icon className="text-muted-foreground h-4 w-4" />
                <span>{company.name}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
