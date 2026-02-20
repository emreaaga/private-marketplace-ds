import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { companiesService, type UpdateCompanyPayload } from "@/features/companies/api/companies";
import { companiesKeys } from "@/features/companies/queries/companies.keys";

type Vars = { id: number; values: UpdateCompanyPayload };

export function useUpdateCompany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: Vars) => companiesService.updateCompany(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: companiesKeys.all });
      toast.success("Данные обновлены");
    },
  });
}
