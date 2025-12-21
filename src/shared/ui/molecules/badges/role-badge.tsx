import { type UserRole, ROLE_CONFIG } from "@/features/users/types/user.types";
import { Badge } from "@/shared/ui/atoms/badge";

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  // eslint-disable-next-line security/detect-object-injection
  const config = ROLE_CONFIG[role];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className="flex items-center gap-1 px-2 py-0.5 text-xs">
      <Icon className="text-muted-foreground size-3.5" />
      {config.label}
    </Badge>
  );
}
