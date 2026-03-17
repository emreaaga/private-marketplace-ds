import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ServiceEditFormValues } from "@/features/service-edit";

import { updateServiceApi } from "../api/update-service.api";

import { servicesKeys } from "./services-keys";

type Vars = { id: number; payload: Partial<ServiceEditFormValues> };

export function useUpdateService() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: Vars) => updateServiceApi(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      toast.success("Услуга обновлена");
    },
  });
}
