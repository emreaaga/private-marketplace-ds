import { Plane, ShieldCheck, Truck, Megaphone, AlertTriangle } from "lucide-react";

import { ServiceType } from "./services.types";

export const SERVICE_TYPE_META: Record<
  ServiceType,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
  }
> = {
  flight: {
    label: "Авиа пер.",
    Icon: Plane,
  },
  customs: {
    label: "Таможня",
    Icon: ShieldCheck,
  },
  delivery: {
    label: "Доставка",
    Icon: Truck,
  },
  marketing: {
    label: "Маркетинг",
    Icon: Megaphone,
  },
  penalty: {
    label: "Штраф",
    Icon: AlertTriangle,
  },
};
