"use client";

import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";
import { COUNTRY_META } from "@/shared/types/geography/country.meta";
import { CountryCode } from "@/shared/types/geography/country.types";
import type { UserDetail } from "@/shared/types/users";
import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog";

import { EditUserForm } from "./edit-user-form";
import type { EditUserFormValues } from "./edit-user.types";

type Props = {
  open: boolean;
  userId: number | null;
  onOpenChange(open: boolean): void;
  onSubmitAction?: (userId: number, values: EditUserFormValues) => void | Promise<unknown>;
};

const EMPTY: EditUserFormValues = {
  role: "employee",
  name: "",
  surname: "",
  email: "",
  location: { country: null, city: null, district: null },
  address_line: "",
  phone_number: "",
};

export function EditUserDialog({ open, userId, onOpenChange, onSubmitAction }: Props) {
  const enabled = open && userId !== null;

  const { data, isLoading, isError } = useQuery<UserDetail>({
    queryKey: usersKeys.detail(userId),
    enabled,
    queryFn: ({ signal }) => usersService.getUser(userId as number, signal),
    staleTime: 30_000,
  });

  const normalizedData = useMemo<EditUserFormValues>(() => {
    if (!data) return EMPTY;

    return {
      role: data.role,
      name: data.name,
      surname: data.surname,
      email: data.email,
      location: {
        country: (data.country as CountryCode) ?? null,
        city: data.city ?? null,
        district: data.district,
      },
      address_line: data.address_line ?? "",
      phone_number: data.phone_number,
    };
  }, [data]);

  const form = useForm<EditUserFormValues>({
    defaultValues: EMPTY,
    values: open && data ? normalizedData : EMPTY,
    mode: "onChange",
    resetOptions: { keepDirtyValues: true },
  });

  const requestClose = () => {
    if (form.formState.isSubmitting) return;
    onOpenChange(false);
  };

  const handleSubmit = async (values: EditUserFormValues) => {
    if (userId === null || !onSubmitAction) return;

    try {
      const { dirtyFields } = form.formState;
      const dirtyValues: Partial<EditUserFormValues> = {};

      (Object.keys(dirtyFields) as Array<keyof EditUserFormValues>).forEach((key) => {
        if (key === "location") {
          dirtyValues.location = values.location;
        } else {
          const k = key as keyof EditUserFormValues;
          (dirtyValues[k] as EditUserFormValues[typeof k]) = values[k];
        }
      });

      if (dirtyFields.location?.country || dirtyFields.phone_number) {
        const countryKey = values.location.country;
        dirtyValues.phone_code = countryKey ? COUNTRY_META[countryKey as CountryCode]?.phoneCode : "";
      }

      if (Object.keys(dirtyValues).length === 0) {
        onOpenChange(false);
        return;
      }

      await onSubmitAction(userId, dirtyValues as EditUserFormValues);
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={requestClose}>
      <DialogContent className="min-h-105 sm:max-w-130">
        <DialogHeader>
          <DialogTitle>Обновить пользователя {userId ? `#${userId}` : ""}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">Форма редактирования данных.</DialogDescription>

        {isLoading && <div className="text-muted-foreground text-sm">Загрузка данных…</div>}
        {isError && <div className="text-destructive text-sm">Ошибка загрузки</div>}

        {data && <EditUserForm form={form} user={data} onSubmitAction={handleSubmit} />}

        <DialogFooter>
          <Button size="sm" variant="outline" onClick={requestClose} disabled={form.formState.isSubmitting}>
            Закрыть
          </Button>
          <Button
            size="sm"
            type="submit"
            form="edit-user-form"
            className="bg-foreground text-background"
            disabled={isLoading || isError || form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? "Сохранение…" : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
