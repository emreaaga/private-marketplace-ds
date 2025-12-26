import clsx from "clsx";

import { ROLE_CONFIG, STATUS_CLASS, type UserRole, type UserStatus } from "@/features/users/types/user.test";
import { Badge } from "@/shared/ui/atoms/badge";

interface UserBadgeProps {
  role: UserRole;
  status: UserStatus;
}

export function UserBadge({ role, status }: UserBadgeProps) {
  const roleConfig = ROLE_CONFIG[role];
  const Icon = roleConfig.icon;

  return (
    <Badge
      variant="outline"
      title={`${roleConfig.label} • ${status}`}
      className={clsx("flex items-center gap-1 px-2 py-0.5 text-xs", STATUS_CLASS[status])}
    >
      <Icon className="h-3.5 w-3.5" />
    </Badge>
  );
}
