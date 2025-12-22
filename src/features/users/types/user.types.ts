import { Briefcase, CircleCheck, Loader, ShieldAlert, ShieldCheck, Truck, User } from "lucide-react";

export const USER_ROLES = {
  ADMIN: "admin",
  SELLER: "seller",
  CUSTOMER: "customer",
  CARGO: "cargo",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const USER_STATUSES = {
  ACTIVE: "active",
  PENDING: "pending",
  BLOCKED: "blocked",
} as const;

export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES];

export type User = {
  id: number;
  public_id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "pending" | "blocked";
  created_at: string;
};

export type Client = {
  id: number;
  public_id: string;
  name: string;
  status: UserStatus;
  orders_count: number;
  total_spent: number;
  city: string;
  created_at: string;
};

export const ROLE_CONFIG: Record<UserRole, { icon: typeof ShieldCheck; label: string }> = {
  admin: { icon: ShieldCheck, label: "Почта" },
  seller: { icon: Briefcase, label: "Продавец" },
  customer: { icon: User, label: "Клиент" },
  cargo: { icon: Truck, label: "Почта" },
};

export const STATUS_CONFIG: Record<UserStatus, { icon: typeof CircleCheck; color: string; label: string }> = {
  active: {
    icon: CircleCheck,
    color: "#10b981",
    label: "Активен",
  },
  pending: {
    icon: Loader,
    color: "#f59e0b",
    label: "В ожидании",
  },
  blocked: {
    icon: ShieldAlert,
    color: "#ef4444",
    label: "Заблокирован",
  },
};

export interface UserBadgeProps {
  role: UserRole;
  status: UserStatus;
  name: string;
}

export interface UsersListDesktopProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onRoleChange: (id: number, role: UserRole) => void;
  onStatusChange: (id: number, status: UserStatus) => void;
}
