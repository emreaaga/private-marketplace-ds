import { Eye } from "lucide-react";

import { Service } from "@/shared/types/services/services.model";
import { Button } from "@/shared/ui/atoms/button";

export function ServiceActions({ service, onView }: { service: Service; onView(service: Service): void }) {
  return (
    <Button
      variant="ghost"
      title="Просмотр"
      className="h-6 w-6 p-0 hover:bg-gray-500/10"
      onClick={(e) => {
        e.stopPropagation();
        onView(service);
      }}
    >
      <Eye className="text-muted-foreground/80 h-3 w-3" />
    </Button>
  );
}
