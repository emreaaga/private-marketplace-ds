import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCompanyApi, type UpdateCompanyPayload } from "../api/update-company.api";

import { companiesKeys } from "./companies.keys";

type Vars = { id: number; values: UpdateCompanyPayload };

export function useUpdateCompany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: Vars) => updateCompanyApi(id, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: companiesKeys.all });
      toast.success("Данные обновлены");
    },
  });
}
