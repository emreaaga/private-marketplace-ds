import type { GetFlightsPageParams } from "@/features/flights/api/flights";

export const flightsKeys = {
  all: ["flights"] as const,

  lists: () => [...flightsKeys.all, "list"] as const,
  listPage: (params: GetFlightsPageParams) => [...flightsKeys.lists(), "page", params] as const,

  details: () => [...flightsKeys.all, "detail"] as const,
  detail: (id: number | null) => [...flightsKeys.details(), id] as const,
};
