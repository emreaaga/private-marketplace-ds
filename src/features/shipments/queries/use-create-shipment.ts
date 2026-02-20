import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ShipmentsService } from "@/features/shipments/api/shipment";

import { shipmentsKeys } from "./shipments.keys";

export function useCreateShipment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof ShipmentsService.createShipment>[0]) => ShipmentsService.createShipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shipmentsKeys.lists() });
      toast.success("Отправка успешно создана");
    },
  });
}
