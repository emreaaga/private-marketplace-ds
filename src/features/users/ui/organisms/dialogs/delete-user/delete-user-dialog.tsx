"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

export function DeleteUserDialog({
  open,
  userId,
  userName,
  onOpenChange,
  onConfirm,
  pending = false,
  error,
}: {
  open: boolean;
  userId: number | null;
  userName?: string;
  onOpenChange(open: boolean): void;
  onConfirm?(userId: number): void;
  pending?: boolean;
  error?: string | null;
}) {
  const disabled = userId == null || pending;

  return (
    <Dialog open={open} onOpenChange={(next) => (!pending ? onOpenChange(next) : undefined)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить пользователя</DialogTitle>
        </DialogHeader>

        <div className="text-sm">
          Удалить пользователя <span className="font-medium">{userName ?? "—"}</span> (ID:{" "}
          <span className="font-medium">{userId ?? "—"}</span>)?
        </div>

        {error ? <div className="text-destructive text-sm">{error}</div> : null}

        <DialogFooter>
          <Button variant="secondary" disabled={pending} onClick={() => onOpenChange(false)}>
            Отмена
          </Button>

          <Button
            variant="destructive"
            disabled={disabled}
            onClick={() => {
              if (userId == null) return;
              onConfirm?.(userId);
            }}
          >
            {pending ? "Удаление…" : "Удалить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
