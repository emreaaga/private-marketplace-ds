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

import { useCreateServiceForm } from "../model/use-create-service-form";

import { CreateServiceForm } from "./create-service-form";

type Props = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
};

export function CreateServiceDialog({ open, onOpenChangeAction }: Props) {
  const { form, onSubmit, loading } = useCreateServiceForm(() => onOpenChangeAction(false));

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) form.reset();
    onOpenChangeAction(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col p-0 sm:max-w-md">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Создание услуги</DialogTitle>
        </DialogHeader>
        <DialogDescription hidden />

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FormProvider {...form}>
            <CreateServiceForm disabled={loading} />
          </FormProvider>
        </div>

        <DialogFooter className="border-t px-2 py-2">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Отмена
            </Button>
          </DialogClose>

          <Button size="sm" onClick={onSubmit} disabled={loading || !form.formState.isValid}>
            {loading ? "Создание..." : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
