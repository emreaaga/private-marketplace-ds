"use client";

import { Button } from "@/shared/ui/atoms/button";
import { DialogFooter } from "@/shared/ui/atoms/dialog";
import { DrawerFooter } from "@/shared/ui/atoms/drawer";

interface ProductFormFooterProps {
  isDesktop: boolean;
  onCancel: () => void;
  submitLabel?: string;
}

export function ProductFormFooter({ isDesktop, onCancel, submitLabel = "Создать" }: ProductFormFooterProps) {
  if (isDesktop) {
    return (
      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    );
  }

  return (
    <DrawerFooter>
      <Button type="submit">{submitLabel}</Button>
      <Button type="button" variant="outline" onClick={onCancel}>
        Отмена
      </Button>
    </DrawerFooter>
  );
}
