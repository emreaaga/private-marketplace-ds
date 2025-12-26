import type { User } from "@/features/users/types/user.types";
import { UserBadge } from "@/shared/ui/molecules/badges/user-badge";

interface UserCardMobileProps {
  user: User;
  actions?: React.ReactNode;
}

export function UserCardMobile({ user, actions }: UserCardMobileProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-1.5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <p className="shrink-0 font-mono text-xs">{user.public_id}</p>
        <p className="text-muted-foreground min-w-0 flex-1 truncate text-[11px]">{user.email}</p>
        <p className="text-muted-foreground shrink-0 text-[10px]">{user.created_at}</p>
      </div>

      <UserBadge role={user.role} status={user.status} />

      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
