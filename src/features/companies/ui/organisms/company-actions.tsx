import { Eye } from "lucide-react";

import type { Company } from "@/shared/types/company/company.model";
import { Button } from "@/shared/ui/atoms/button";

export function CompanyActions({ company, onView }: { company: Company; onView(company: Company): void }) {
  return (
    <Button
      variant="ghost"
      title="Просмотр"
      className="h-6 w-6 p-0 hover:bg-gray-500/10"
      onClick={(e) => {
        e.stopPropagation();
        onView(company);
      }}
    >
      <Eye className="text-muted-foreground/80 h-3 w-3" />
    </Button>
  );
}
