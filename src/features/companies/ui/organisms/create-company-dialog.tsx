"use client";

import { cn } from "@/shared/lib/utils";
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

export default function CreateCompanyDialog({ open, onOpenChangeAction }: Props) {
  const { form, setFormAction, errors, clearErrorAction, loading, submit, reset, isFormIncomplete } =
    useCreateCompanyForm(() => onOpenChangeAction(false));

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) reset();
    onOpenChangeAction(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-muted/40 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl p-0 shadow-2xl sm:max-w-md">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold tracking-tight">Создание фирмы</DialogTitle>
        </DialogHeader>
        <DialogDescription hidden></DialogDescription>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <CreateCompanyForm
            form={form}
            setFormAction={setFormAction}
            errors={errors}
            clearErrorAction={clearErrorAction}
          />
        </div>

        <DialogFooter className="bg-muted/5 gap-2 border-t px-6 py-4">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground font-normal transition-colors"
            >
              Отмена
            </Button>
          </DialogClose>

          <Button
            size="sm"
            onClick={submit}
            disabled={loading || isFormIncomplete}
            className={cn(
              "h-8 min-w-25 rounded-md px-4 text-[13px] font-medium transition-all",
              "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black",
              "shadow-sm active:scale-[0.98]",
            )}
          >
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
