import type React from "react";

import { Calendar, Plane, CheckCircle } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";

export type FlightStatus = Flight["status"];

export const FLIGHT_STATUS_META: Record<
  FlightStatus,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  planned: { label: "Создан", Icon: Calendar, variant: "secondary" },
  departed: { label: "В пути", Icon: Plane, variant: "default" },
  arrived: { label: "Прибыл", Icon: CheckCircle, variant: "default" },
  closed: { label: "Закрыт", Icon: CheckCircle, variant: "secondary" },
};
