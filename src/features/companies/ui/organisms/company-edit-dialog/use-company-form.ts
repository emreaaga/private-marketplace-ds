import { useMemo } from "react";

import { useForm } from "react-hook-form";

import type { UpdateCompanyPayload } from "@/features/companies/api/companies";
import { COMPANY_TYPE_META } from "@/shared/types/company/company.meta";
import type { CompanyDetailResponse } from "@/shared/types/company/company.model";
import type { CompanyType } from "@/shared/types/company/company.types";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import type { CountryCode } from "@/shared/types/geography/country.types";

import type { CompanyFormValues } from "./types";

const DEFAULT_TYPE = "platform" as CompanyType;

const EMPTY: CompanyFormValues = {
  name: "",
  type: DEFAULT_TYPE,
  location: { country: null, city: null, district: null },
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
  const normalizedData = useMemo<CompanyFormValues>(() => {
    if (!companyData) return EMPTY;

    const typeKeys = Object.keys(COMPANY_TYPE_META) as CompanyType[];
    const safeCountry = companyData.country as CountryCode;
    const cityCode = companyData.city;
    const countryMeta = COUNTRY_META[safeCountry];
    const cityExists = countryMeta ? Object.values(countryMeta.cities).some((c) => c.code === cityCode) : false;

    return {
      name: companyData.name,
      type: typeKeys.includes(companyData.type as CompanyType) ? (companyData.type as CompanyType) : DEFAULT_TYPE,
      location: {
        country: safeCountry,
        city: cityExists ? cityCode : null,
        district: null,
      },
      is_active: !!companyData.is_active,
    };
  }, [companyData]);

  const form = useForm<CompanyFormValues>({
    defaultValues: EMPTY,
    values: open && companyData ? normalizedData : EMPTY,
  });

  const requestClose = () => {
    if (pending || form.formState.isSubmitting) return;
    onOpenChangeAction(false);
  };

  const submit = async (values: CompanyFormValues) => {
    if (companyId == null || !onSubmitAction) return;
    const { country, city } = values.location;
    if (!country || !city) return;

    try {
      const payload = {
        name: values.name.trim(),
        type: values.type,
        location: { country, city },
        is_active: values.is_active,
      };
      await onSubmitAction(companyId, payload);
      onOpenChangeAction(false);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const isSaveDisabled = pending || isLoading || !form.formState.isDirty || !form.formState.isValid;

  return { form, submit, requestClose, isSaveDisabled };
}
