"use client";

import { useEffect, useCallback } from "react";

import { useQuery } from "@tanstack/react-query";
import { useForm, type UseFormReturn } from "react-hook-form";

import { usersService } from "@/features/users/api/users";
import { usersKeys } from "@/features/users/queries/users.keys";
import type { UserDetail } from "@/shared/types/users";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

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

function toFormValues(user: UserDetail): EditUserFormValues {
  return {
    role: user.role,
    name: user.name,
    surname: user.surname,
    email: user.email,
    location: { country: user.country, city: user.city, district: user.district },
    address_line: user.address_line ?? "",
    phone_number: user.phone_number,
  };
}

function syncForm(form: UseFormReturn<EditUserFormValues>, open: boolean, userId: number | null, data?: UserDetail) {
  if (!open) return;

  if (userId == null || !data) {
    form.reset(EMPTY);
    return;
  }

  form.reset(toFormValues(data));
}

export function EditUserDialog({ open, userId, onOpenChange, onSubmitAction }: Props) {
  const form = useForm<EditUserFormValues>({ defaultValues: EMPTY, mode: "onChange" });

  const enabled = open && userId !== null;

  const { data, isLoading, isError } = useQuery<UserDetail>({
    queryKey: usersKeys.detail(userId),
    enabled,
    queryFn: ({ signal }) => usersService.getUser(userId as number, signal),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    syncForm(form, open, userId, data);
  }, [form, open, userId, data]);

  const requestClose = useCallback(() => {
    if (form.formState.isSubmitting) return;
    onOpenChange(false);
  }, [form.formState.isSubmitting, onOpenChange]);

  const handleSubmit = useCallback(
    async (values: EditUserFormValues) => {
      if (userId === null || !onSubmitAction) return;
      await onSubmitAction(userId, values);
      requestClose();
    },
    [userId, onSubmitAction, requestClose],
  );

  const isSaveDisabled =
    userId === null || isLoading || isError || form.formState.isSubmitting || !form.formState.isValid;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && requestClose()}>
      <DialogContent className="min-h-[420px] sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Обновить пользователя {userId}</DialogTitle>
        </DialogHeader>

        {isLoading && <div className="text-muted-foreground text-sm">Загрузка данных…</div>}
        {isError && <div className="text-destructive text-sm">Ошибка загрузки</div>}

        {data && <EditUserForm form={form} user={data} onSubmitAction={handleSubmit} />}

        <DialogFooter>
          <Button size="sm" variant="secondary" disabled={form.formState.isSubmitting} onClick={requestClose}>
            Закрыть
          </Button>

          <Button size="sm" type="submit" form="edit-user-form" disabled={isSaveDisabled}>
            {form.formState.isSubmitting ? "Сохранение…" : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
