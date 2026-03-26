"use client";

import { AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog";

interface ConfirmDialogProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmArrivalDialog({ isOpen, isLoading, onClose, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden border-zinc-200 p-0 shadow-lg sm:max-w-[400px] dark:border-zinc-800">
        {/* Верхняя часть с иконкой (в стиле Notion/Vercel) */}
        <div className="flex items-center gap-3 px-6 pt-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
            <AlertCircle className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium tracking-tight">Подтверждение</DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 py-4">
          <DialogDescription className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Вы действительно хотите подтвердить прием рейса с таможни?
          </DialogDescription>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 border-t border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <Button size="sm" variant="outline" onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button size="sm" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : null}
            Подтвердить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
