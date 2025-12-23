import { Users, ShoppingCart, AlertTriangle } from "lucide-react";

import type { ActivityItemProps } from "./activity-item";

export const activities: ActivityItemProps[] = [
  {
    title: "Новый продавец",
    description: "A001 зарегистрирован",
    badge: "Новый",
    icon: Users,
  },
  {
    title: "Заказ на модерации",
    description: "A001P10001 ожидает подтверждения",
    badge: "Внимание",
    tone: "warning",
    icon: ShoppingCart,
  },
  {
    title: "Жалоба клиента",
    description: "Client B1001 — спор по заказу",
    badge: "Критично",
    tone: "danger",
    icon: AlertTriangle,
  },
];
