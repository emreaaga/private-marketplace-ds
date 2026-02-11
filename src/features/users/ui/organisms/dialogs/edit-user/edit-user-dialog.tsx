"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { usersService } from "@/features/users/api/users";
import type { UserDetail } from "@/shared/types/users";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { EditUserForm } from "./edit-user-form";
import type { EditUserFormValues } from "./edit-user.types";

const EMPTY: EditUserFormValues = {
  role: "employee",
  name: "",
  surname: "",
  email: "",
  location: { country: null, city: null, district: null },
  address_line: "",
  phone_number: "",
};

export function EditUserDialog({
  open,
  userId,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  userId: number | null;
  onOpenChange(open: boolean): void;
  onSubmit?: (userId: number, values: EditUserFormValues) => void | Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [user, setUser] = useState<UserDetail | null>(null);

  const form = useForm<EditUserFormValues>({ defaultValues: EMPTY });

  useEffect(() => {
    if (!open || userId == null) return;

    const controller = new AbortController();

    setLoading(true);
    setLoadError(null);

    usersService
      .getUser(userId, controller.signal)
      .then((u) => {
        setUser(u);

        form.reset({
          role: u.role,
          name: u.name ?? "",
          surname: u.surname ?? "",
          email: u.email ?? "",
          location: {
            country: (u.country as any) ?? null,
            city: (u.city as any) ?? null,
            district: (u.district as any) ?? null,
          },
          address_line: u.address_line ?? "",
          phone_number: u.phone_number ?? "",
        });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        if (err?.code === "ERR_CANCELED") return;

        setLoadError("Не удалось загрузить пользователя");
        setUser(null);
        form.reset(EMPTY);
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userId]);

  const handleDialogOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setLoading(false);
      setLoadError(null);
      setUser(null);
      form.reset(EMPTY);
    }
  };

  const disabled = userId == null || loading || !!loadError || form.formState.isSubmitting;

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Обновить пользователя {userId ?? ""}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="text-muted-foreground text-sm">Загрузка данных…</div>
        ) : loadError ? (
          <div className="text-destructive text-sm">{loadError}</div>
        ) : user ? (
          <EditUserForm
            form={form}
            user={user}
            onSubmit={async (values) => {
              if (userId == null) return;
              await onSubmit?.(userId, values);
              handleDialogOpenChange(false);
            }}
          />
        ) : null}

        <DialogFooter>
          <Button variant="secondary" onClick={() => handleDialogOpenChange(false)}>
            Закрыть
          </Button>
          <Button type="submit" form="edit-user-form" disabled={disabled}>
            {form.formState.isSubmitting ? "Сохранение…" : "Сохранить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
