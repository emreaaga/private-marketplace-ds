import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { companiesService } from "@/features/companies/api/companies";
import { companiesKeys } from "@/features/companies/queries/companies.keys";

export function useCreateCompany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => companiesService.createCompany(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: companiesKeys.all });
      toast.success("Фирма создана");
    },
  });
}
