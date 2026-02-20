import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { flightsService } from "@/features/flights/api/flights";
import { flightsKeys } from "@/features/flights/queries/flights-keys";

export function useCreateFlight() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: flightsService.createFlight,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: flightsKeys.lists() });
      toast.success("Рейс успешно создан");
    },
  });
}
