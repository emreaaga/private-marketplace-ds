import dynamic from "next/dynamic";

import type { User, UserRole, UserStatus } from "@/features/users/types/user.types";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { ListSkeleton } from "@/shared/ui/molecules/list-skeleton";
import { TableSkeleton } from "@/shared/ui/molecules/table-skeleton";

const UsersListDesktop = dynamic(() => import("./user-desktop").then((m) => m.UsersListDesktop), {
  loading: () => <TableSkeleton rows={10} columns={4} />,
});

const UsersListMobile = dynamic(() => import("./user-mobile").then((m) => m.UsersListMobile), {
  loading: () => <ListSkeleton rows={6} />,
});

interface UsersListResponsiveProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onRoleChange: (id: number, role: UserRole) => void;
  onStatusChange: (id: number, status: UserStatus) => void;
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
