"use client";
import { useState } from "react";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function DepositDialog({ open, onOpenChange }: DepositDialogProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const quickAmounts = [50, 100, 250, 500];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Пополнение</DialogTitle>
          <DialogDescription>Добавить средства на кошелёк</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Сумма</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

            <div className="flex gap-2">
              {quickAmounts.map((amt) => (
                <Button key={amt} size="sm" variant="outline" onClick={() => setAmount(amt.toString())}>
                  ${amt}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Способ оплаты</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите способ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Банковская карта</SelectItem>
                <SelectItem value="bank">Банковский перевод</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button disabled={!amount || !method}>Подтвердить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
