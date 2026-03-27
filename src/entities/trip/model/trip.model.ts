import { TripStatuses } from "./trip.status";

export type TripModel = {
  id: number;
  company_id: number;
  vehicle_info: string;
  driver_info: string;
  status: TripStatuses;
  departure_at: string;
  arrival_at: string;
  created_at: string;
};
