import { useState } from "react";

import { toast } from "sonner";

import { companiesService } from "@/features/companies/api/companies";
import type { CompanyType } from "@/shared/types/company/company.types";
import { createCompanySchema } from "@/shared/types/company/create-company.schema";
import type { CountryCode } from "@/shared/types/geography/country.types";

export type CreateCompanyForm = {
  name: string;
  type: CompanyType | "";
  country: CountryCode | null;
  city: string | null;
};

type FormErrors = Partial<Record<keyof CreateCompanyForm, true>>;

const initialForm: CreateCompanyForm = {
  name: "",
  type: "",
  country: null,
  city: null,
};

export function useCreateCompanyForm(onSuccess: () => void) {
  const [form, setForm] = useState<CreateCompanyForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setLoading(false);
  };

  const submit = async () => {
    const payload = {
      name: form.name,
      type: form.type,
      country: form.country,
      city: form.city,
    };

    const parsed = createCompanySchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        nextErrors[field] = true;
      });
      setErrors(nextErrors);
      return;
    }

    try {
      setLoading(true);

      await companiesService.createCompany(parsed.data);

      toast.success("Фирма создана");
      onSuccess();
    } catch {
      toast.error("Не удалось создать фирму");
    } finally {
      setLoading(false);
    }
  };

  const isFormIncomplete = !form.name || !form.type || !form.country || !form.city;

  return {
    isFormIncomplete,
    form,
    setForm,
    errors,
    clearError,
    loading,
    submit,
    reset,
  };
}
