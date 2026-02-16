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
          <DialogTitle>Удалить</DialogTitle>
        </DialogHeader>

        <div className="text-sm">
          Удалить
          {entityId ? (
            <>
              {" "}
              (ID: <span className="font-medium">{entityId}</span>)
            </>
          ) : null}
          ?
        </div>

        <DialogFooter>
          <Button variant="secondary" disabled={pending} onClick={() => onOpenChange(false)}>
            Отмена
          </Button>

          <Button variant="destructive" disabled={pending} onClick={() => !pending && onConfirm()}>
            {pending ? "Удаление…" : "Удалить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
