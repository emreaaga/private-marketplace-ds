import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { revalidateFlights } from "../api-server/flights-actions";
// eslint-disable-next-line import/order
import { confirmArrivalApi } from "../api/confirm-arrival.api";

import { flightsKeys } from "./flights-keys";

export function useConfirmArrival() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: number) => confirmArrivalApi(id),
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: flightsKeys.lists() });
      await revalidateFlights();
      router.refresh();
      toast.success("Прием с таможни успешно подтвержден");
    },
  });
}
