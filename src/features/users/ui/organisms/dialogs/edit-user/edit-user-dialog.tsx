"use client";

import { useMemo } from "react";

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

// eslint-disable-next-line complexity
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
      location: { country: data.country, city: data.city, district: data.district },
      address_line: data.address_line ?? "",
      phone_number: data.phone_number,
    };
  }, [data]);

  const form = useForm<EditUserFormValues>({
    defaultValues: EMPTY,
    values: open && data ? normalizedData : EMPTY,
    mode: "onChange",
  });

  const requestClose = () => {
    if (form.formState.isSubmitting) return;
    onOpenChange(false);
  };

  const handleSubmit = async (values: EditUserFormValues) => {
    if (userId === null || !onSubmitAction) return;
    try {
      await onSubmitAction(userId, values);
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={requestClose}>
      <DialogContent className="min-h-[420px] sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Обновить пользователя {userId ? `#${userId}` : ""}</DialogTitle>
        </DialogHeader>

        {isLoading && <div className="text-muted-foreground text-sm">Загрузка данных…</div>}
        {isError && <div className="text-destructive text-sm">Ошибка загрузки</div>}

        {data && <EditUserForm form={form} user={data} onSubmitAction={handleSubmit} />}

        <DialogFooter>
          <Button size="sm" variant="secondary" disabled={form.formState.isSubmitting} onClick={requestClose}>
            Закрыть
          </Button>

          <Button
            size="sm"
            type="submit"
            form="edit-user-form"
            disabled={isLoading || isError || form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? "Сохранение…" : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
