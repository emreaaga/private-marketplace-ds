"use client";

import { useState } from "react";

import type { CompanyType } from "@/shared/types/company/company.types";
import { createCompanySchema } from "@/shared/types/company/create-company.schema";
import type { CountryCode } from "@/shared/types/geography/country.types";

import { useCreateCompany } from "../../queries/use-create-company";

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

export function useCreateCompanyForm(onSuccessAction: () => void) {
  const [form, setForm] = useState<CreateCompanyForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const createMutation = useCreateCompany();

  const clearErrorAction = (field: keyof FormErrors) => {
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
    createMutation.reset();
  };

  const submit = async () => {
    const payload = {
      name: form.name.trim(),
      type: form.type,
      location: {
        country: form.country,
        city: form.city,
      },
    };

    const parsed = createCompanySchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[issue.path.length - 1] as keyof FormErrors;
        nextErrors[field] = true;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    try {
      await createMutation.mutateAsync(parsed.data);
      onSuccessAction();
      reset();
    } catch (error) {
      console.error("Failed to create company:", error);
    }
  };

  const isFormIncomplete = !form.name.trim() || !form.type || !form.country || !form.city;

  return {
    form,
    setFormAction: setForm,
    errors,
    clearErrorAction,
    loading: createMutation.isPending,
    isFormIncomplete,
    submit,
    reset,
  };
}
