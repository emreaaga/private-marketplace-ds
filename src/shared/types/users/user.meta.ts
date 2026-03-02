import { Briefcase, ShoppingCart, Truck, Users } from "lucide-react";

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
  employee: {
    label: "Сотрудник",
    Icon: Users,
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
