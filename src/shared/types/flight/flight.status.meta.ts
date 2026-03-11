import type React from "react";

import { Check, CircleDashed, MapPin, PlaneTakeoff } from "lucide-react";

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
    label: "Запланирован",
    Icon: CircleDashed,
    variant: "secondary",
    step: 1,
  },
  departed: {
    label: "Вылетел",
    Icon: PlaneTakeoff,
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
    Icon: Check,
    variant: "secondary",
    step: 4,
  },
};
