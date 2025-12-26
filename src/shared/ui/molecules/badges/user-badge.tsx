import clsx from "clsx";

import { ROLE_CONFIG, STATUS_CLASS, type UserRole, type UserStatus } from "@/features/users/types/user.test";

interface UserBadgeProps {
  role: UserRole;
  status: UserStatus;
}

export function UserBadge({ role, status }: UserBadgeProps) {
  const { icon: Icon, label } = ROLE_CONFIG[role];

  return (
    <span className={clsx("inline-flex h-6 w-6 items-center justify-center rounded-md border", STATUS_CLASS[status])}>
      <Icon className="h-5 w-5" />
    </span>
  );
}
