import { api } from "@/shared/api";

import { type CreateFlightPayload } from "./types/create-flight.pay";

export const createFlightApi = async (payload: CreateFlightPayload) => {
  await api.post("/flights", payload);
};
