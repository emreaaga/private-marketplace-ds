import { UserStatuses } from "./user.model";

export const USER_STATUS_META: Record<UserStatuses, { label: string; colorClass: string }> = {
  active: {
    label: "Активен",
    colorClass: "text-green-600",
  },
  blocked: {
    label: "Заблокирован",
    colorClass: "text-red-600",
  },
  pending: {
    label: "Ожидание",
    colorClass: "text-muted-foreground",
  },
};
