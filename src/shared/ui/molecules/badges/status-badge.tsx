import { CircleCheck, Loader, ShieldAlert } from "lucide-react";

import type { UserStatus } from "@/features/users/types/user.types";
import { Badge } from "@/shared/ui/atoms/badge";

const STATUS_CONFIG: Record<UserStatus, { icon: typeof CircleCheck; color: string; label: string }> = {
  active: {
    icon: CircleCheck,
    color: "#10b981",
    label: "Активен",
  },
  pending: {
    icon: Loader,
    color: "#f59e0b",
    label: "В ожидании",
  },
  blocked: {
    icon: ShieldAlert,
    color: "#ef4444",
    label: "Заблокирован",
  },
};

interface StatusBadgeProps {
  status: UserStatus;
  variant?: "default" | "compact";
}

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1 border px-2 py-0.5 text-xs capitalize"
      style={{
        borderColor: config.color,
        backgroundColor: `${config.color}20`,
        color: config.color,
      }}
    >
      <Icon className="size-3.5" style={{ color: config.color }} />
      {variant === "default" ? config.label : status}
    </Badge>
  );
}
