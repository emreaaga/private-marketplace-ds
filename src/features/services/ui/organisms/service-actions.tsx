import { Eye } from "lucide-react";

import { Service } from "@/shared/types/services/services.model";

export function ServiceActions({ service, onView }: { service: Service; onView(service: Service): void }) {
  return (
    <button
      type="button"
      className="text-muted-foreground hover:bg-muted focus:ring-ring inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors focus:ring-2 focus:outline-none"
      onClick={(e) => {
        e.stopPropagation();
        onView(service);
      }}
    >
      <Eye className="h-4 w-4" />
    </button>
  );
}
