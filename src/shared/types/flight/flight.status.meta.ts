import type React from "react";

import { CircleDashed, Plane, MapPin, CheckCircle2 } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";

export type FlightStatus = Flight["status"];

export const FLIGHT_STATUS_META: Record<
  FlightStatus,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
    variant: "default" | "secondary" | "destructive" | "outline";
    step: number;
  }
> = {
  planned: {
    label: "Создан",
    Icon: CircleDashed,
    variant: "secondary",
    step: 1,
  },
  departed: {
    label: "В пути",
    Icon: Plane,
    variant: "default",
    step: 2,
  },
  arrived: {
    label: "Прибыл",
    Icon: MapPin,
    variant: "default",
    step: 3,
  },
  closed: {
    label: "Закрыт",
    Icon: CheckCircle2,
    variant: "secondary",
    step: 4,
  },
};
