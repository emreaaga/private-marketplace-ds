import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { servicesService } from "../api/services";
import { servicesKeys } from "../queries/services-keys";

export function useServiceCreate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: servicesService.createService,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: servicesKeys.all });
      toast.success("Услуга успешно создана");
    },
  });
}
