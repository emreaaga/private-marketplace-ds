import { CityCode } from "@/entities/geography";
import { api } from "@/shared/api";

import { TripStatuses } from "../model/trip.status";

export type TripStop = {
  city: CityCode;
  branch_id: number;
  stop_order: number;
  status: TripStatuses;
  orders_count: number;
};

export type GetTripStopsRes = {
  data: TripStop[];
};

export const getTripStopsApi = async (tripId: number, signal?: AbortSignal) => {
  const { data } = await api.get<GetTripStopsRes>(`/trips/${tripId}`, {
    signal,
  });

  return data;
};
