"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { revalidateFlights } from "@/entities/flight";
import { revalidateOrders } from "@/entities/order";
import { ordersKeys } from "@/entities/order/queries/orders-keys";
import { shipmentsKeys } from "@/entities/shipment/queries/shipments.keys";

import { postDevClearApi, postDevSeedApi } from "../api/dashboard-dev.api";

export function useDashboardDev() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const invalidateAll = async () => {
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    queryClient.invalidateQueries({ queryKey: shipmentsKeys.all });
    queryClient.invalidateQueries({ queryKey: ordersKeys.all });

    await Promise.all([revalidateOrders(), revalidateFlights()]);

    router.refresh();
  };

  const seedMutation = useMutation({
    mutationFn: postDevSeedApi,
    onSuccess: async () => {
      await invalidateAll();
    },
  });

  const clearMutation = useMutation({
    mutationFn: postDevClearApi,
    onSuccess: async () => {
      await invalidateAll();
    },
  });

  return {
    seedData: seedMutation.mutateAsync,
    isSeeding: seedMutation.isPending,
    clearData: clearMutation.mutateAsync,
    isClearing: clearMutation.isPending,
  };
}
