import { Briefcase, ShieldCheck, Truck, Users } from "lucide-react";

import { AllUserRoles, UserRoles } from "./user.model";

interface RoleMeta {
  label: string;
  Icon: React.FC<{ className?: string }>;
  disabled?: boolean;
}

export const ALL_USER_ROLE_META: Record<AllUserRoles, RoleMeta> = {
  admin: {
    label: "Админ.",
    Icon: ShieldCheck,
    disabled: false,
  },
  company_owner: {
    label: "Директ.",
    Icon: Briefcase,
    disabled: false,
  },
  // employee: {
  //   label: "Сотрудник",
  //   Icon: Users,
  //   disabled: false,
  // },
  courier: {
    label: "Курьер",
    Icon: Truck,
    disabled: true,
  },
  clients: {
    label: "Клиент",
    Icon: Users,
    disabled: true,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { admin: _, ...REST_ROLES } = ALL_USER_ROLE_META;

export const USER_ROLE_META = REST_ROLES as Record<UserRoles, RoleMeta>;
