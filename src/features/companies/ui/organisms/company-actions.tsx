import { Eye } from "lucide-react";

import type { Company } from "@/shared/types/company/company.model";

export function CompanyActions({ company, onView }: { company: Company; onView(company: Company): void }) {
  return (
    <button
      type="button"
      aria-label="Просмотр компании"
      className="text-muted-foreground hover:bg-muted focus:ring-ring inline-flex h-6 w-6 items-center justify-center rounded-md focus:ring-2 focus:outline-none"
      onClick={(e) => {
        e.stopPropagation();
        onView(company);
      }}
    >
      <Eye className="h-4 w-4" />
    </button>
  );
}
