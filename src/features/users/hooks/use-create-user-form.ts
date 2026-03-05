import { useState } from "react";

import { useInvalidateUsers } from "../api/use-invalidate-users";
import { useCreateUser } from "../mutations/user-create-user";
import { createUserSchema, type CreateUserFormData } from "../types/create-user.schema";

import { useUserFormState } from "./use-user-form-state";
import { useUserLocation } from "./use-user-location";

const generateEmail = (name: string, surname: string) => {
  const prefix = (name.slice(0, 2) + surname.slice(0, 2)).toLowerCase();
  const random = Math.floor(100 + Math.random() * 900);
  return `${prefix}${random}@gmail.com`;
};

const generatePassword = () => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  return Array.from(crypto.getRandomValues(new Uint32Array(12)))
    .map((x) => charset[x % charset.length])
    .join("");
};

export function useCreateUserForm() {
  const { invalidate } = useInvalidateUsers();
  const location = useUserLocation();
  const form = useUserFormState();
  const createUserMutation = useCreateUser();

  const [errors, setErrors] = useState<Partial<Record<keyof CreateUserFormData, string>>>({});
  const [createdData, setCreatedData] = useState<{ email: string; password: string } | null>(null);

  const submit = async () => {
    const email = generateEmail(form.name, form.surname);
    const password = generatePassword();

    const payload = {
      company_id: form.companyId,
      name: form.name.trim(),
      surname: form.surname.trim(),
      email,
      password,
      location: {
        country: location.country || "",
        city: location.city || "",
        district: location.district || "",
      },
      address_line: form.addressLine || "",
      phone_country_code: location.phoneCode,
      phone_number: form.phoneNumber,
      role: form.role,
    };

    const parsed = createUserSchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: any = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        nextErrors[path] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    try {
      await createUserMutation.mutateAsync(parsed.data);

      await invalidate();

      setCreatedData({ email, password });
    } catch {
      // Ошибки обработает мутация через toast
    }
  };

  const reset = () => {
    form.reset();
    location.reset();
    createUserMutation.reset();
    setErrors({});
    setCreatedData(null);
  };

  return {
    ...form,
    ...location,
    created: createdData,
    isPending: createUserMutation.isPending,
    errors,
    submit,
    reset,
    clearError: (field: string) => setErrors((prev) => ({ ...prev, [field]: undefined })),
  };
}
