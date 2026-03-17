import type { GetFlightsPar } from "../api/get-flights.api";

export const flightsKeys = {
  all: ["flights"] as const,

  lists: () => [...flightsKeys.all, "list"] as const,
  listPage: (params: GetFlightsPar) => [...flightsKeys.lists(), "page", params] as const,

  details: () => [...flightsKeys.all, "detail"] as const,
  detail: (id: number | null) => [...flightsKeys.details(), id] as const,
};
