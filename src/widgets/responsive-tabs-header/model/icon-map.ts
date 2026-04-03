import {
  Banknote,
  Building2,
  ClipboardList,
  Link as LinkIcon,
  LucideTextSelection,
  Package,
  Plane,
  ShoppingCart,
  Truck,
  Users,
  UserSquare,
} from "lucide-react";

export const ICON_MAP = {
  users: Users,
  orders: ClipboardList,
  access: LinkIcon,
  shipments: Package,
  flights: Plane,
  cart: ShoppingCart,
  finance: Banknote,
  company: Building2,
  service: LucideTextSelection,
  clients: UserSquare,
  truck: Truck,
} as const;

export type HeaderIconKey = keyof typeof ICON_MAP;
