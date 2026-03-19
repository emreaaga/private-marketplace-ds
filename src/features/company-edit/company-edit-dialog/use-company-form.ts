"use client";

import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type CompanyDetailResponse, type CompanyType, type UpdateCompanyPayload } from "@/entities/company";
import { editCompanySchema, type EditCompanySchema } from "@/entities/company/model/edit-company.schema";
import { type CityCode, type CountryCode } from "@/entities/geography";

const EMPTY: EditCompanySchema = {
  name: "",
  type: "postal" as CompanyType,
  location: { country: "" as CountryCode, city: "" as CityCode },
  is_active: true,
};

type UseCompanyFormProps = {
  open: boolean;
  companyId: number | null;
  companyData?: CompanyDetailResponse["data"];
  pending: boolean;
  isLoading: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction?: (companyId: number, values: UpdateCompanyPayload) => void | Promise<unknown>;
};

export function useCompanyForm({
  open,
  companyId,
  companyData,
  pending,
  isLoading,
  onOpenChangeAction,
  onSubmitAction,
}: UseCompanyFormProps) {
  const normalizedData = useMemo<EditCompanySchema>(() => {
    if (!companyData) return EMPTY;

    const country = companyData.country as CountryCode;
    const city = companyData.city as CityCode;

    return {
      name: companyData.name,
      type: companyData.type as CompanyType,
      location: { country, city },
      is_active: !!companyData.is_active,
    };
  }, [companyData]);

  const form = useForm<EditCompanySchema>({
    resolver: zodResolver(editCompanySchema),
    defaultValues: EMPTY,
    values: open && companyData ? normalizedData : EMPTY,
  });

  const submit = async (values: EditCompanySchema) => {
    if (companyId == null || !onSubmitAction) return;

    const payload: UpdateCompanyPayload = {
      name: values.name.trim(),
      type: values.type,
      location: {
        country: values.location.country,
        city: values.location.city,
      },
      is_active: values.is_active,
    };

    await onSubmitAction(companyId, payload);
    onOpenChangeAction(false);
  };

  const requestClose = () => {
    if (pending || form.formState.isSubmitting) return;
    onOpenChangeAction(false);
  };

  const isSaveDisabled = pending || isLoading || !form.formState.isDirty || !form.formState.isValid;

  return { form, submit, requestClose, isSaveDisabled };
}
