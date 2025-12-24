"use client";

import { Copy, QrCode } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/atoms/dialog";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/shared/ui/atoms/input-group";
import { Label } from "@/shared/ui/atoms/label";

interface ReceiveDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  receiveUrl: string;
}

export function ReceiveDialog({ open, onOpenChange, receiveUrl }: ReceiveDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Получить средства</DialogTitle>
          <DialogDescription>Отправитель может отсканировать QR-код или перейти по ссылке</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-background flex h-44 w-44 items-center justify-center rounded-md border">
              <QrCode className="text-muted-foreground h-28 w-28" />
            </div>
            <span className="text-muted-foreground text-xs">Сканируйте для отправки средств</span>
          </div>

          <div className="space-y-2">
            <Label>Ссылка для перевода</Label>
            <InputGroup>
              <InputGroupInput disabled value={receiveUrl} className="pl-1!" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton className="rounded-full" size="icon-sm">
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
