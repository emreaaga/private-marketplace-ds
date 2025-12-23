"use client";

import { Copy, QrCode } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Input } from "@/shared/ui/atoms/input";
import { Label } from "@/shared/ui/atoms/label";

interface ReceiveDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  receiveUrl: string;
}

export function ReceiveDialog({ open, onOpenChange, receiveUrl }: ReceiveDialogProps) {
  const copy = async () => {
    await navigator.clipboard.writeText(receiveUrl);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Получить средства</DialogTitle>
          <DialogDescription>Отправитель может отсканировать QR-код или перейти по ссылке</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* QR */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-background flex h-44 w-44 items-center justify-center rounded-md border">
              {/* QR component */}
              <QrCode className="text-muted-foreground h-28 w-28" />
            </div>
            <span className="text-muted-foreground text-xs">Сканируйте для отправки средств</span>
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label>Ссылка для перевода</Label>
            <div className="flex gap-2">
              <Input readOnly value={receiveUrl} />
              <Button size="icon" variant="outline" onClick={copy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
