"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";

import { ReceiveForm } from "./receive-form";

interface ReceiveDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  receiveUrl: string;
}

export default function ReceiveDialog({ open, onOpenChange, receiveUrl }: ReceiveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Получить средства</DialogTitle>
        </DialogHeader>

        <ReceiveForm receiveUrl={receiveUrl} />
      </DialogContent>
    </Dialog>
  );
}
