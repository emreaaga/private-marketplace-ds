import { api } from "@/shared/api";

import type { Flight } from "../model/flight.model";

import { type UpdateFlightRequest } from "./types/update-flight.pay";

export const updateFlightApi = async (id: number, payload?: UpdateFlightRequest) => {
  await api.put<{ data: Flight }>(`/flights/${id}`, payload);
};
