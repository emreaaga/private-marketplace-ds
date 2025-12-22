import type { User } from "@/features/users/types/user.types";
import { RoleBadge } from "@/shared/ui/molecules/badges/role-badge";
import { StatusBadge } from "@/shared/ui/molecules/badges/status-badge";

interface UserCardMobileProps {
  user: User;
  actions?: React.ReactNode;
}

export function UserCardMobile({ user, actions }: UserCardMobileProps) {
  return (
    <div className="flex items-start justify-between p-2">
      <div className="flex flex-col space-y-2">
        <p className="font-mono text-sm">{user.public_id}</p>
        <p className="text-muted-foreground text-xs">{user.email}</p>

        <div className="flex items-center gap-1">
          <RoleBadge role={user.role} />
          <StatusBadge status={user.status} />
        </div>

        <p className="text-muted-foreground text-xs">{user.created_at}</p>
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
