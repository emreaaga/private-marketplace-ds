import { TripStatuses } from "../../model/trip.status";

export type GetTripsRes = {
  id: number;
  total_city: number;
  total_orders: number;
  total_weight: string;
  total_remaining: string;
  status: TripStatuses;
  created_at: string;
};
