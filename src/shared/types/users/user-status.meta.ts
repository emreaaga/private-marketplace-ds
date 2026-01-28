import { UserStatuses } from "./user.model";

export const USER_STATUS_META: Record<UserStatuses, { label: string; dotClass: string }> = {
  active: {
    label: "Активен",
    dotClass: "bg-green-400",
  },
  blocked: {
    label: "Заблокирован",
    dotClass: "bg-red-400",
  },
  pending: {
    label: "Ожидание",
    dotClass: "bg-muted-foreground",
  },
};
