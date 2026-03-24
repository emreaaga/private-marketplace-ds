"use client";

import { Check, Loader2 } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { CountryCode } from "@/entities/geography";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/atoms/button";
import { Input } from "@/shared/ui/atoms/input";
import CountryCityPopoverSelect from "@/shared/ui/atoms/select-with-flags";

import { useCreateBranch } from "../queries/use-create-branch";

interface CreateBranchValues {
  name: string;
  location: {
    country: CountryCode | null;
    city: string | null;
  };
}

type Props = {
  companyId: number;
  onCloseAction: () => void;
};

export function CreateBranchForm({ companyId, onCloseAction }: Props) {
  const { mutate, isPending } = useCreateBranch(companyId);

  const { register, handleSubmit, reset, control } = useForm<CreateBranchValues>({
    defaultValues: {
      name: "",
      location: { country: null, city: null },
    },

    mode: "onChange",
  });

  const watchedValues = useWatch({ control });

  const name = watchedValues.name || "";
  const location = watchedValues.location || { country: null, city: null };

  const isValid = name.length >= 2 && !!location.country && !!location.city;

  const onSubmit = (values: CreateBranchValues) => {
    if (!isValid) return;

    mutate(
      {
        name: values.name,
        location: {
          country: values.location.country!,
          city: values.location.city!,
        },
      },
      {
        onSuccess: () => {
          reset();
          onCloseAction();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-muted/30 mb-4 flex flex-col gap-2 rounded-lg border border-dashed p-2 transition-all"
    >
      <div className="flex items-center justify-between px-1">
        <span className="text-foreground/70 text-[10px] font-bold tracking-wider uppercase">Новый филиал</span>

        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className={cn(
            "h-6 w-6 rounded-md transition-all",
            isValid && !isPending
              ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
              : "text-muted-foreground/40",
          )}
          disabled={!isValid || isPending}
        >
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-[1.2fr_1fr] gap-1.5">
        <Input
          {...register("name", { required: true, minLength: 2 })}
          placeholder="Название"
          className="bg-background/50 h-8 text-[12px]"
          autoFocus
          disabled={isPending}
        />

        <Controller
          control={control}
          name="location"
          rules={{ required: true }}
          render={({ field }) => (
            <CountryCityPopoverSelect
              mode="country-city"
              value={{
                country: field.value?.country ?? null,
                city: field.value?.city ?? null,
              }}
              onChangeAction={(val) => field.onChange(val)}
              className={cn("bg-background/50 h-8 text-[12px]", isPending && "pointer-events-none opacity-50")}
            />
          )}
        />
      </div>
    </form>
  );
}
