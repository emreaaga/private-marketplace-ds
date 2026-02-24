import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/shared/lib/api";

import { flightExpensesKeys } from "./flight-expenses.keys";

export type CreateFlightExpenseDto = {
  flightId: number;
  type: string;
  amount: string;
  description?: string;
};

export const useCreateFlightExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateFlightExpenseDto) => {
      const { data } = await api.post("/flight-expenses", dto);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: flightExpensesKeys.lists(),
      });
    },
  });
};
