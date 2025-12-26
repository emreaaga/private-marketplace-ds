import { LucideIcon, Briefcase, Shield, User, Truck } from "lucide-react";

export type UserRole = "admin" | "customer" | "seller" | "cargo";
export type UserStatus = "active" | "pending" | "blocked";

export const ROLE_CONFIG: Record<UserRole, { icon: LucideIcon; label: string }> = {
  admin: {
    icon: Shield,
    label: "Админ",
  },
  cargo: {
    icon: Truck,
    label: "Почта",
  },
  customer: {
    icon: Briefcase,
    label: "Продавец",
  },
  seller: {
    icon: User,
    label: "Пользователь",
  },
};

export const STATUS_CLASS: Record<UserStatus, string> = {
  active: "text-green-600 bg-green-500/10 border-green-500/20",
  pending: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20",
  blocked: "text-red-600 bg-red-500/10 border-red-500/20",
};
