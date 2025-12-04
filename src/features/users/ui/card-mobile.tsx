import { RoleBadge } from "@/shared/ui/molecules/badges/role-badge";
import { StatusBadge } from "@/shared/ui/molecules/badges/status-badge";
import type { User } from "@/features/users/types/user.types";

interface UserCardMobileProps {
  user: User;
  actions?: React.ReactNode;
}

export function UserCardMobile({ user, actions }: UserCardMobileProps) {
  return (
    <div className="flex items-start justify-between p-3">
      <div className="flex flex-col space-y-1">
        <p className="text-[15px] font-medium">{user.name}</p>
        <p className="text-muted-foreground text-xs">{user.email}</p>

        <div className="flex items-center gap-2 pt-1">
          <RoleBadge role={user.role} />
          <StatusBadge status={user.status} />
        </div>

        <p className="text-muted-foreground pt-1 text-[10px]">{new Date(user.created_at).toLocaleString()}</p>
      </div>

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
