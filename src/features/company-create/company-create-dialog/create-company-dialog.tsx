"use client";

import { FormProvider } from "react-hook-form";

import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog";

import { CreateCompanyForm } from "./create-company-form";
import { useCreateCompanyForm } from "./use-create-company-form";

type Props = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export function CreateCompanyDialog({ open, onOpenChangeAction }: Props) {
  const { form, loading, submit, reset } = useCreateCompanyForm(() => onOpenChangeAction(false));

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) reset();
    onOpenChangeAction(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[85vh] w-full flex-col overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-xl font-semibold tracking-tight">Создание фирмы</DialogTitle>
        </DialogHeader>
        <DialogDescription hidden />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FormProvider {...form}>
            <form id="create-company-form" onSubmit={submit}>
              <CreateCompanyForm />
            </form>
          </FormProvider>
        </div>

        <DialogFooter className="border-t px-2 py-2">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Отмена
            </Button>
          </DialogClose>

          <Button size="sm" type="submit" form="create-company-form" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Создание</span>
              </div>
            ) : (
              "Создать"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
