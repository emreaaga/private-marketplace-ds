import { LucideIcon, MapPin, PackageCheck, Truck } from "lucide-react";

import { TripStatuses } from "./trip.status";

export const TRIP_STATUS_META: Record<
  TripStatuses,
  {
    label: string;
    step: number;
    Icon: LucideIcon;
  }
> = {
  created: { label: "Загрузка", step: 1, Icon: PackageCheck },
  on_way: { label: "В пути", step: 2, Icon: Truck },
  completed: { label: "Завершен", step: 3, Icon: MapPin },
};
