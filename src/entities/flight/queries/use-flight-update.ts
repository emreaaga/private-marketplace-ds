import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// eslint-disable-next-line import/order
import { revalidateFlights } from "../api-server/flights-actions";
import { type UpdateFlightRequest } from "../api/types/update-flight.pay";
import { updateFlightApi } from "../api/update-flight.api";

import { flightsKeys } from "./flights-keys";

export function useUpdateFlight() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload?: UpdateFlightRequest }) => updateFlightApi(id, payload),

    onSuccess: async (_, variables) => {
      await revalidateFlights();
      qc.invalidateQueries({ queryKey: flightsKeys.lists() });
      qc.invalidateQueries({ queryKey: flightsKeys.detail(variables.id) });

      router.refresh();
      toast.success("Рейс успешно обновлен");
    },
  });
}
