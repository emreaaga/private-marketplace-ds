"use client";

import { useState } from "react";

import { QrCode } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/atoms/dialog";
import { Input } from "@/shared/ui/atoms/input";
import { Label } from "@/shared/ui/atoms/label";

import { QRScanner } from "./qr-scanner";

interface SendDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  balance: number;
}

export function SendDialog({ open, onOpenChange, balance }: SendDialogProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [scanOpen, setScanOpen] = useState(false);

  const fee = amount ? Number(amount) * 0.02 : 0;
  const total = amount ? Number(amount) + fee : 0;

  const disabled = !recipient || !amount || Number(amount) <= 0 || total > balance;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setScanOpen(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Отправить средства</DialogTitle>
          <DialogDescription>Перевод средств другому пользователю</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted rounded-md px-3 py-2 text-sm">
            Доступно: <span className="font-medium tabular-nums">{balance}</span>
          </div>

          <div className="space-y-2">
            <Label>Получатель</Label>
            <div className="flex gap-2">
              <Input
                placeholder="ID, адрес или ссылка"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => {
                  setScanOpen((v) => !v);
                }}
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {scanOpen && (
            <div className="space-y-2">
              <QRScanner
                key="qr-scanner"
                onResult={(value) => {
                  setRecipient(value);
                  setScanOpen(false);
                }}
              />
              <p className="text-muted-foreground text-center text-xs">Наведите камеру на QR-код</p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Сумма</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button disabled={disabled}>Отправить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
