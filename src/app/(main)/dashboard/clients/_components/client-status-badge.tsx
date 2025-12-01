import { Check, Clock, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface ClientStatusBadgeProps {
  status: string;
}

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  if (status === "active") {
    return (
      <Badge variant="default" className="gap-1">
        <Check className="h-3 w-3" />
        Активен
      </Badge>
    );
  }

  if (status === "pending") {
    return (
      <Badge variant="outline" className="gap-1">
        <Clock className="h-3 w-3" />
        Ожидает
      </Badge>
    );
  }

  return (
    <Badge variant="destructive" className="gap-1">
      <X className="h-3 w-3" />
      Заблокирован
    </Badge>
  );
}
