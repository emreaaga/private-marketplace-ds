import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createServiceSchema, type ServicePrice, type ServiceType, useServiceCreate } from "@/entities/service";

type FormValues = z.infer<typeof createServiceSchema>;

export function useCreateServiceForm(onSuccessAction: () => void) {
  const createMutation = useServiceCreate();

  const form = useForm<FormValues>({
    resolver: zodResolver(createServiceSchema),
    mode: "onChange",
    defaultValues: {
      company_id: undefined,
      type: "" as ServiceType,
      pricing_type: "" as ServicePrice,
      price: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createMutation.mutateAsync(data);
      onSuccessAction();
      form.reset();
    } catch {
      // Ошибка в мутации (toast)
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    loading: createMutation.isPending,
    isFormIncomplete: !form.formState.isValid,
  };
}
