import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { flightsKeys } from "@/entities/flight";

import { createTripApi } from "../api/create-trip.api";

import { tripsKeys } from "./trips.keys";

export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createTripApi>[0]) => createTripApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: flightsKeys.lists() });
      toast.success("Рейс успешно создан");
    },
  });
}
