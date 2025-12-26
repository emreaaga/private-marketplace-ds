"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/ui/atoms/dialog";

import SendForm from "./send-form";

interface SendDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  userBalance: number;
}

export default function SendDialog({ open, onOpenChange, userBalance }: SendDialogProps) {
  const handleSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Отправить средства</DialogTitle>
        </DialogHeader>

        <SendForm userBalance={userBalance} />

        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>

          <Button size="sm" onClick={handleSubmit}>Отправить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
