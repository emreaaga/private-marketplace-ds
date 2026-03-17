import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { type UpdateFlightRequest } from "../api/types/update-flight.pay";
import { updateFlightApi } from "../api/update-flight.api";

import { flightsKeys } from "./flights-keys";

export function useUpdateFlight() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload?: UpdateFlightRequest }) => updateFlightApi(id, payload),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: flightsKeys.lists() });
      qc.invalidateQueries({ queryKey: flightsKeys.detail(variables.id) });
      toast.success("Рейс успешно обновлен");
    },
  });
}
