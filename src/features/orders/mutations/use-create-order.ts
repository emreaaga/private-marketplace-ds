import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ordersService, type CreateOrderPayload, type CreateOrderResponse } from "@/features/orders/api/orders";
import { shipmentsKeys } from "@/features/shipments/queries/shipments.keys";

export function useCreateOrder() {
  const qc = useQueryClient();

  return useMutation<CreateOrderResponse, unknown, CreateOrderPayload>({
    mutationFn: (payload) => ordersService.createOrder(payload),

    onSuccess: () => {
      toast.success("Заказ создан");
      qc.invalidateQueries({
        queryKey: shipmentsKeys.list({ status: "draft" }),
        refetchType: "active",
      });
    },
  });
}
