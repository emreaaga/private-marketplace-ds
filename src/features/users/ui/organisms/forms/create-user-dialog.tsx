"use client";

import { CheckCircle } from "lucide-react";

import { useCreateUserForm } from "@/features/users/hooks/use-create-user-form";
import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/shared/ui/atoms/dialog";
import { CopyRow } from "@/shared/ui/molecules/copy-row";

import { CreateUserForm } from "./create-user-form";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const form = useCreateUserForm();

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);

    if (!open) {
      setTimeout(() => {
        form.reset();
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[85vh] w-full flex-col overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Новый пользователь</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {form.created ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-md bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Пользователь успешно создан!</p>
                </div>
              </div>

              <div className="space-y-2">
                <CopyRow label="Email" value={form.created.email} />
                <CopyRow label="Пароль" value={form.created.password} />
              </div>
            </div>
          ) : (
            <CreateUserForm form={form} />
          )}
        </div>

        <DialogFooter className="border-t px-2 py-2">
          {form.created ? (
            <DialogClose asChild>
              <Button size="sm">Закрыть</Button>
            </DialogClose>
          ) : (
            <>
              <DialogClose asChild>
                <Button variant="ghost" size="sm">
                  Отмена
                </Button>
              </DialogClose>

              <Button size="sm" onClick={form.submit}>
                Создать
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
