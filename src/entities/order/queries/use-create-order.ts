"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { shipmentsKeys } from "@/entities/shipment";

import { createOrderApi, CreateOrderPay, CreateOrderRes } from "../api/create-order.api";

import { ordersKeys } from "./orders-keys";

export function useCreateOrder() {
  const qc = useQueryClient();

  return useMutation<CreateOrderRes, Error, CreateOrderPay>({
    mutationFn: (payload) => createOrderApi(payload),

    onSuccess: () => {
      toast.success("Заказ создан");

      qc.invalidateQueries({
        queryKey: ordersKeys.all,
      });

      qc.invalidateQueries({
        queryKey: shipmentsKeys.list({ status: "draft" }),
        refetchType: "active",
      });
    },
  });
}
