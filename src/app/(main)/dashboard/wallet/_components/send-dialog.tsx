"use client";

import { useState } from "react";

import { Coins } from "lucide-react";

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/shared/ui/atoms/input-group";
import { Label } from "@/shared/ui/atoms/label";

interface SendDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  balance: number;
}

export function SendDialog({ open, onOpenChange, balance }: SendDialogProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const disabled = !recipient || !amount || Number(amount) <= 0 || Number(amount) > balance;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
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
            <Input
              placeholder="ID, адрес или ссылка"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Сумма</Label>
            <InputGroup>
              <InputGroupInput placeholder="Введите количество" />
              <InputGroupAddon>
                <Coins />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button disabled={disabled}>Отправить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
