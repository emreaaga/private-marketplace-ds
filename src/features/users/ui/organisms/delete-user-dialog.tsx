"use client";

import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog";

export function DeleteUserDialog({
  open,
  userId,
  userName,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  userId: number | null;
  userName?: string;
  onOpenChange(open: boolean): void;
  onConfirm?(userId: number): void;
}) {
  const disabled = userId == null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удалить пользователя</DialogTitle>
          <DialogDescription>Действие необратимо.</DialogDescription>
        </DialogHeader>

        <div className="text-sm">
          Удалить пользователя <span className="font-medium">{userName ?? "—"}</span> (ID:{" "}
          <span className="font-medium">{userId ?? "—"}</span>)?
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button
            variant="destructive"
            disabled={disabled}
            onClick={() => {
              if (userId == null) return;
              onConfirm?.(userId);
              onOpenChange(false);
            }}
          >
            Удалить (пока заглушка)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
