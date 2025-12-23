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
import { Separator } from "@/shared/ui/atoms/separator";

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  balance: number;
}

export function WithdrawDialog({ open, onOpenChange, balance }: WithdrawDialogProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const fee = amount ? Number(amount) * 0.02 : 0;
  const total = amount ? Number(amount) - fee : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Вывод средств</DialogTitle>
          <DialogDescription>Списание средств с кошелька</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted rounded-md px-3 py-2 text-sm">
            Доступно: <span className="font-medium">${balance}</span>
          </div>

          <div className="space-y-2">
            <Label>Сумма</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Способ</Label>
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

          {amount && (
            <>
              <Separator />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Комиссия (2%)</span>
                  <span>${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>К получению</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button disabled={!amount || !method || Number(amount) > balance}>Подтвердить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
