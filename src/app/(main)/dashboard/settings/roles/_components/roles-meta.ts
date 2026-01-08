import { Box, Store, User, Truck, Plane, FileText } from "lucide-react";

export const ROLE_META: Record<string, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  A: { label: "Почта", Icon: Box },
  B: { label: "Продавец", Icon: Store },
  C: { label: "Клиент", Icon: User },
  D: { label: "Курьер", Icon: Truck },
  E: { label: "Рейс", Icon: Plane },
  F: { label: "Декларант", Icon: FileText },
};
