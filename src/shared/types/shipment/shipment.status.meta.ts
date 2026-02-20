import { CircleDashed, PackageCheck, Plane, MapPinCheck, Lock } from "lucide-react";

import type { ShipmentStatuses } from "@/shared/types/shipment/shipment.status";

export const SHIPMENT_STATUS_META: Record<
  ShipmentStatuses,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
    step: number;
  }
> = {
  draft: {
    label: "Черновик",
    Icon: CircleDashed,
    step: 1,
  },
  ready: {
    label: "Готово к отправке",
    Icon: PackageCheck,
    step: 2,
  },
  in_flight: {
    label: "В пути",
    Icon: Plane,
    step: 3,
  },
  arrived: {
    label: "Прибыло",
    Icon: MapPinCheck,
    step: 4,
  },
  closed: {
    label: "Закрыто",
    Icon: Lock,
    step: 5,
  },
};
