"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

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
  onSubmitAction?: (userId: number, values: EditUserFormValues) => Promise<void>;
};

const EMPTY: EditUserFormValues = {
  role: "employee",
  name: "",
  surname: "",
  email: "",
  location: {
    country: null,
    city: null,
    district: null,
  },
  address_line: "",
  phone_number: "",
};

function toFormValues(user: UserDetail): EditUserFormValues {
  return {
    role: user.role,
    name: user.name,
    surname: user.surname,
    email: user.email,
    location: {
      country: user.country,
      city: user.city,
      district: user.district,
    },
    address_line: user.address_line ?? "",
    phone_number: user.phone_number,
  };
}

export function EditUserDialog({ open, userId, onOpenChange, onSubmitAction }: Props) {
  const form = useForm<EditUserFormValues>({
    defaultValues: EMPTY,
    mode: "onChange",
  });

  const enabled = open && userId !== null;

  const { data, isLoading, isError } = useQuery<UserDetail>({
    queryKey: usersKeys.detail(userId),
    enabled,
    queryFn: ({ signal }) => {
      if (userId === null) {
        throw new Error("User ID is null");
      }
      return usersService.getUser(userId, signal);
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(toFormValues(data));
    }
  }, [data, form]);

  const handleClose = () => {
    if (form.formState.isSubmitting) return;
    form.reset(EMPTY);
    onOpenChange(false);
  };

  const handleSubmit = async (values: EditUserFormValues) => {
    if (userId === null || !onSubmitAction) return;

    await onSubmitAction(userId, values);
    handleClose();
  };

  const isSaveDisabled =
    userId === null || isLoading || isError || form.formState.isSubmitting || !form.formState.isValid;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && handleClose()}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Обновить пользователя {userId}</DialogTitle>
        </DialogHeader>

        {isLoading && <div className="text-muted-foreground text-sm">Загрузка данных…</div>}

        {isError && <div className="text-destructive text-sm">Ошибка загрузки</div>}

        {data && <EditUserForm form={form} user={data} onSubmit={handleSubmit} />}

        <DialogFooter>
          <Button variant="secondary" disabled={form.formState.isSubmitting} onClick={handleClose}>
            Закрыть
          </Button>

          <Button type="submit" form="edit-user-form" disabled={isSaveDisabled}>
            {form.formState.isSubmitting ? "Сохранение…" : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
