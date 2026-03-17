import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createShipmentApi } from "../api/create-shipment.api";

import { shipmentsKeys } from "./shipments.keys";

export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createShipmentApi>[0]) => createShipmentApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentsKeys.lists() });
      toast.success("Отправка успешно создана");
    },
  });
}
