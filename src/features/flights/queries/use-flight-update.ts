import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { flightsService } from "@/features/flights/api/flights";

import { flightsKeys } from "./flights-keys";

export function useUpdateFlight() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => flightsService.updateFlight(id, payload),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: flightsKeys.lists() });
      qc.invalidateQueries({ queryKey: flightsKeys.detail(variables.id) });
      toast.success("Рейс успешно обновлен");
    },
  });
}
