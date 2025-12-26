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
    <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
      <Icon className="text-muted-foreground size-3.5" />
      {config.label}
    </Badge>
  );
}
