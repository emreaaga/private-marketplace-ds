import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createServiceApi } from "../api/create-service.api";

import { servicesKeys } from "./services-keys";

export function useServiceCreate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createServiceApi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      toast.success("Услуга успешно создана");
    },
  });
}
