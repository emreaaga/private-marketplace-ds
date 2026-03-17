import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useInvalidateFlights } from "../api-server/use-invalidate-flights";
// eslint-disable-next-line import/order
import { createFlightApi } from "../api/create-flight.api";

import { flightsKeys } from "./flights-keys";

export function useCreateFlight() {
  const qc = useQueryClient();
  const { invalidate } = useInvalidateFlights();

  return useMutation({
    mutationFn: createFlightApi,

    onSuccess: async () => {
      await invalidate();

      qc.invalidateQueries({ queryKey: flightsKeys.lists() });

      toast.success("Рейс успешно создан");
    },
  });
}
