import { Users, Lock, LayoutDashboard, LayoutDashboardIcon, UserCircle, type LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Панели",
    items: [
      {
        title: "Главная",
        url: "/dashboard/main",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Страницы",
    items: [
      {
        title: "Пользователи",
        url: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Мои продукты",
        url: "/dashboard/products",
        icon: LayoutDashboardIcon,
      },
      {
        title: "Клиенты",
        url: "/dashboard/clients",
        icon: UserCircle,
      },
      {
        title: "Роли",
        url: "/dashboard/coming-soon",
        icon: Lock,
        comingSoon: true,
      },
    ],
  },
];
