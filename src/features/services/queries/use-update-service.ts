import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage } from "@/shared/lib/get-error-message";

import { servicesService } from "../api/services";
import { servicesKeys } from "../queries/services-keys";
import type { FormValues } from "../ui/organisms/service-edit-dialog";

type Vars = { id: number; payload: Partial<FormValues> };

export function useUpdateService() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: Vars) => servicesService.updateService(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      toast.success("Услуга обновлена");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
