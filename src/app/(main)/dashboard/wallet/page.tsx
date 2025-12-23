"use client";
import { useState } from "react";

import { Wallet, Plus, ArrowUpRight, Download, CreditCard } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/atoms/card";

import { DepositDialog } from "./_components/deposit-dialog";
import { WithdrawDialog } from "./_components/withdraw-dialog";

export default function WalletPage() {
  const balance = 1515;

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Кошелёк
        </div>

        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4" />
          Экспорт
        </Button>
      </div>

      {/* Wallet Card */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          {/* Balance */}
          <div>
            <div className="text-muted-foreground text-xs">Баланс</div>
            <div className="text-3xl font-semibold">${balance}</div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setDepositOpen(true)}>
              <Plus className="h-4 w-4" />
              Пополнить
            </Button>

            <Button size="sm" variant="outline" onClick={() => setWithdrawOpen(true)}>
              <ArrowUpRight className="h-4 w-4" />
              Вывести
            </Button>

            <Button size="sm" variant="secondary">
              <CreditCard className="h-4 w-4" />
              Оплатить
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История кошелька</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-muted-foreground text-xs">
                  <th className="px-3 py-2 text-left font-medium">Операция</th>
                  <th className="px-3 py-2 text-left font-medium">Дата</th>
                  <th className="px-3 py-2 text-right font-medium">Сумма</th>
                </tr>
              </thead>

              <tbody>
                <tr className="hover:bg-muted/40">
                  <td className="px-3 py-2">Пополнение</td>
                  <td className="text-muted-foreground px-3 py-2">20.12.2024</td>
                  <td className="px-3 py-2 text-right font-medium text-emerald-600">+$500</td>
                </tr>

                <tr className="hover:bg-muted/40">
                  <td className="px-3 py-2">Вывод</td>
                  <td className="text-muted-foreground px-3 py-2">19.12.2024</td>
                  <td className="px-3 py-2 text-right font-medium">-$150</td>
                </tr>

                <tr className="hover:bg-muted/40">
                  <td className="px-3 py-2">Оплата</td>
                  <td className="text-muted-foreground px-3 py-2">18.12.2024</td>
                  <td className="px-3 py-2 text-right font-medium">-$85</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Button variant="ghost" size="sm" className="text-muted-foreground mt-2 px-0 text-xs">
            Вся история →
          </Button>
        </CardContent>
      </Card>

      <DepositDialog open={depositOpen} onOpenChange={setDepositOpen} />
      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} balance={balance} />
    </div>
  );
}
