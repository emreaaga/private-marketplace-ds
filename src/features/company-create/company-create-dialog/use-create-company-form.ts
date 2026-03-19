"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCompanySchema, useCreateCompany, type CompanyType, type CreateCompanySchema } from "@/entities/company";
import type { CityCode, CountryCode } from "@/entities/geography";

export function useCreateCompanyForm(onSuccessAction: () => void) {
  const createMutation = useCreateCompany();

  const form = useForm<CreateCompanySchema>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
      type: "" as CompanyType,
      location: {
        country: "" as CountryCode,
        city: "" as CityCode,
      },
    },
  });

  const submit = async (data: CreateCompanySchema) => {
    await createMutation.mutateAsync(data, {
      onSuccess: () => {
        onSuccessAction();
        form.reset();
      },
    });
  };

  const onInvalid = () => {
    toast.error("Заполните обязательные поля");
  };

  return {
    form,
    loading: createMutation.isPending,
    submit: form.handleSubmit(submit, onInvalid),
    reset: () => form.reset(),
  };
}
