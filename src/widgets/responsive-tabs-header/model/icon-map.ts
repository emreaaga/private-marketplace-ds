import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  ClipboardList,
  Link as LinkIcon,
  LucideTextSelection,
  Package,
  Plane,
  ShoppingCart,
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
  outbound: ArrowUpRight,
  inbound: ArrowDownLeft,
  clients: UserSquare,
} as const;

export type HeaderIconKey = keyof typeof ICON_MAP;
