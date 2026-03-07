import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { flightsService } from "@/features/flights/api/flights";
import { flightsKeys } from "@/features/flights/queries/flights-keys";

import { useInvalidateFlights } from "../api/use-invalidate-flights";

export function useCreateFlight() {
  const qc = useQueryClient();
  const { invalidate } = useInvalidateFlights();

  return useMutation({
    mutationFn: flightsService.createFlight,

    onSuccess: async () => {
      await invalidate();

      qc.invalidateQueries({ queryKey: flightsKeys.lists() });

      toast.success("Рейс успешно создан");
    },
  });
}
