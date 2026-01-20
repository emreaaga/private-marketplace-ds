import { useState } from "react";

import { createUserSchema, type CreateUserFormData } from "../types/create-user.schema";

import { useCreateUserSubmit } from "./use-create-user-submit";
import { useUserFormState } from "./use-user-form-state";
import { useUserLocation } from "./use-user-location";

type FormErrors = Partial<Record<keyof CreateUserFormData, string>>;

export function useCreateUserForm() {
  const location = useUserLocation();
  const form = useUserFormState();
  const submitter = useCreateUserSubmit();

  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const submit = async () => {
    const payload = {
      company_id: form.companyId,
      name: form.name,
      surname: form.surname,
      country: location.country,
      city: location.city,
      district: location.district,
      address_line: form.addressLine,
      phone_country_code: location.phoneCode,
      phone_number: form.phoneNumber,
      role: form.role,
    };

    const parsed = createUserSchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};

      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        nextErrors[field] = issue.message;
      });

      setErrors(nextErrors);
      return;
    }

    setErrors({});

    await submitter.submit({
      ...parsed.data,
      address_line: parsed.data.address_line ?? "",
    });
  };

  const reset = () => {
    form.reset();
    location.reset();
    submitter.reset();
    setErrors({});
  };

  return {
    ...form,
    ...location,
    ...submitter,

    errors,
    clearError,

    submit,
    reset,
  };
}
