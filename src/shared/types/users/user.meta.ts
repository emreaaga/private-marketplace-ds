import { Briefcase, ShoppingCart, Truck, UserCog } from "lucide-react";

import { UserRoles } from "@/shared/types/users/user.model";

export const USER_ROLE_META: Record<
  UserRoles,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
    disabled?: boolean;
  }
> = {
  company_owner: {
    label: "Директ.",
    Icon: Briefcase,
    disabled: false,
  },
  admin: {
    label: "Админ.",
    Icon: UserCog,
    disabled: true,
  },
  employee: {
    label: "Сотрудник",
    Icon: Briefcase,
    disabled: true,
  },
  courier: {
    label: "Курьер",
    Icon: Truck,
    disabled: true,
  },
  seller: {
    label: "Продавец",
    Icon: ShoppingCart,
    disabled: true,
  },
};
