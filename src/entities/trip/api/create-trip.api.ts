import { api } from "@/shared/api";

import type { CreateTripPay } from "./types/create-trip.pay";

export const createTripApi = async (payload: CreateTripPay) => {
  await api.post("/trips", payload);
};
