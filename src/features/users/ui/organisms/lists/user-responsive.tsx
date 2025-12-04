import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";

import { UsersListDesktop } from "./user-desktop";
import { UsersListMobile } from "./user-mobile";

interface UsersListResponsiveProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
  onRoleChange?: (id: number, role: UserRole) => void;
  onStatusChange?: (id: number, status: UserStatus) => void;
}

export function UsersListResponsive(props: UsersListResponsiveProps) {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm">Загрузка...</p>
      </div>
    );
  }

  return isMobile ? <UsersListMobile {...props} /> : <UsersListDesktop {...props} />;
}
