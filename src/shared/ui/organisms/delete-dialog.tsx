"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

type DeleteDialogProps = {
  open: boolean;
  entityId?: number | string;
  pending?: boolean;
  onOpenChange(open: boolean): void;
  onConfirm(): void | Promise<void>;
};

export function DeleteDialog({ open, entityId, pending = false, onOpenChange, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !pending && onOpenChange(next)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md">
            Вы действительно хотите удалить
            {entityId ? (
              <>
                {" "}
                ID: <span className="font-medium">{entityId}</span>
              </>
            ) : null}
            ?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm" variant="secondary" disabled={pending} onClick={() => onOpenChange(false)}>
            Отмена
          </Button>

          <Button size="sm" variant="destructive" disabled={pending} onClick={() => !pending && onConfirm()}>
            {pending ? "Удаление…" : "Удалить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
