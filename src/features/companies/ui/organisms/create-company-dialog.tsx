"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/shared/ui/atoms/dialog";
import { Spinner } from "@/shared/ui/atoms/spinner";

import { CreateCompanyForm } from "./create-company-form";
import { useCreateCompanyForm } from "./use-create-company-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateCompanyDialog({ open, onOpenChange }: Props) {
  const { form, setForm, errors, clearError, loading, submit, reset, isFormIncomplete } = useCreateCompanyForm(() =>
    onOpenChange(false),
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) reset();
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[85vh] w-full flex-col overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle>Создание фирмы</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <CreateCompanyForm form={form} setForm={setForm} errors={errors} clearError={clearError} />
        </div>

        <DialogFooter className="border-t px-2 py-2">
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Отмена
            </Button>
          </DialogClose>

          <Button size="sm" onClick={submit} disabled={loading || isFormIncomplete}>
            {loading && (
              <span className="mr-2 inline-flex">
                <Spinner className="h-4 w-4" />
              </span>
            )}
            {loading ? "Создание..." : "Создать"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
