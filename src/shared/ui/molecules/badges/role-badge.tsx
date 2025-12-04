import { ShieldCheck, Briefcase, User } from "lucide-react";

import type { UserRole } from "@/features/users/types/user.types";
import { Badge } from "@/shared/ui/atoms/badge";

const ROLE_CONFIG: Record<UserRole, { icon: typeof ShieldCheck; label: string }> = {
  admin: { icon: ShieldCheck, label: "Админ" },
  manager: { icon: Briefcase, label: "Продавец" },
  user: { icon: User, label: "Клиент" },
};

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = ROLE_CONFIG[role];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className="flex items-center gap-1 px-2 py-0.5 text-xs">
      <Icon className="text-muted-foreground size-3.5" />
      {config.label}
    </Badge>
  );
}
