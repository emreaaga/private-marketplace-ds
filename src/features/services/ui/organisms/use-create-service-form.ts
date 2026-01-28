import { useState } from "react";

import { toast } from "sonner";

import { createServiceSchema } from "@/shared/types/services/create-service.schema";
import type { ServicePrice } from "@/shared/types/services/services.pricing";
import type { ServiceType } from "@/shared/types/services/services.types";

import { servicesService } from "../../api/services";

export type CreateServiceForm = {
  company_id?: number;
  type: ServiceType | "";
  pricing_type: ServicePrice | "";
  price: string;
};

type FormErrors = Partial<Record<keyof CreateServiceForm, true>>;

const initialForm: CreateServiceForm = {
  company_id: undefined,
  type: "",
  pricing_type: "",
  price: "",
};

export function useCreateServiceForm(onSuccess: () => void) {
  const [form, setForm] = useState<CreateServiceForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

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
    if (!form.company_id) return;

    const payload = {
      company_id: form.company_id,
      type: form.type,
      pricing_type: form.pricing_type,
      price: Number.parseFloat(form.price),
    };

    const parsed = createServiceSchema.safeParse(payload);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof CreateServiceForm;
        nextErrors[field] = true;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      await servicesService.createService(parsed.data);

      toast.success("Услуга создана");
      onSuccess();
    } catch {
      toast.error("Не удалось создать услугу");
    } finally {
      setLoading(false);
    }
  };

  const isFormIncomplete = !form.company_id || !form.type || !form.pricing_type || !form.price;

  return {
    isFormIncomplete,
    form,
    setForm,
    loading,

    errors,
    clearError,

    submit,
    reset,
  };
}
