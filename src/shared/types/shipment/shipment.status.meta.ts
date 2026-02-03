import { Calendar, PackageCheck, Plane, MapPinCheck, Lock } from "lucide-react";

import type { ShipmentStatuses } from "@/shared/types/shipment/shipment.status";

export const SHIPMENT_STATUS_META: Record<
  ShipmentStatuses,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
  }
> = {
  draft: {
    label: "Создан",
    Icon: Calendar,
  },

  ready: {
    label: "Готово",
    Icon: PackageCheck,
  },

  in_flight: {
    label: "В пути",
    Icon: Plane,
  },

  arrived: {
    label: "Прибыло",
    Icon: MapPinCheck,
  },

  closed: {
    label: "Закрыто",
    Icon: Lock,
  },
};
