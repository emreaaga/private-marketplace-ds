import { type UserStatus, STATUS_CONFIG } from "@/features/users/types/user.types";
import { Badge } from "@/shared/ui/atoms/badge";

interface StatusBadgeProps {
  status: UserStatus;
  variant?: "default" | "compact";
}

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  // eslint-disable-next-line security/detect-object-injection
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
