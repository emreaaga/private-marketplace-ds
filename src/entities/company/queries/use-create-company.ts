import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createCompanyApi, CreateCompanyPayload } from "../api/create-company.api";

import { companiesKeys } from "./companies.keys";

export function useCreateCompany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCompanyPayload) => createCompanyApi(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: companiesKeys.all });
      toast.success("Фирма создана");
    },
  });
}
