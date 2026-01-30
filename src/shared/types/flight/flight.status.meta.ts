import { Calendar, Plane, CheckCircle } from "lucide-react";

import type { Flight } from "@/shared/types/flight/flight.model";

export type FlightStatus = Flight["status"];

export const FLIGHT_STATUS_META: Record<
  FlightStatus,
  {
    label: string;
    Icon: React.FC<{ className?: string }>;
  }
> = {
  planned: {
    label: "Создан",
    Icon: Calendar,
  },

  departed: {
    label: "В пути",
    Icon: Plane,
  },

  arrived: {
    label: "Прибыл",
    Icon: CheckCircle,
  },

  closed: {
    label: "Закрыт",
    Icon: CheckCircle,
  },
};
