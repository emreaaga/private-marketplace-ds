import type { GetFlightsPar } from "../api/get-flights.api";
import { GetFlightsLookupParams } from "../api/types/lookup-flight.res";

export const flightsKeys = {
  all: ["flights"] as const,

  lists: () => [...flightsKeys.all, "list"] as const,
  listPage: (params: GetFlightsPar) => [...flightsKeys.lists(), "page", params] as const,

  lookups: () => [...flightsKeys.lists(), "lookup"] as const,
  lookup: (params: GetFlightsLookupParams) => [...flightsKeys.lookups(), params] as const,

  distributions: () => [...flightsKeys.all, "distribution"] as const,
  distribution: (id: number | null) => [...flightsKeys.distributions(), id] as const,

  details: () => [...flightsKeys.all, "detail"] as const,
  detail: (id: number | null) => [...flightsKeys.details(), id] as const,
};
