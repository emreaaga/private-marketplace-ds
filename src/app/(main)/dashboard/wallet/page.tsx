"use client";
import { useState } from "react";

import { Coins, ArrowUp, ArrowDown } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { ButtonGroup } from "@/shared/ui/atoms/button-group";
import { DataTable } from "@/shared/ui/organisms/table/data-table";

import { ReceiveDialog } from "./_components/receive-dialog";
import { SendDialog } from "./_components/send-dialog";
import { data, transactionColumns } from "./_components/transactions-columns";

export default function WalletPage() {
  const balance = 1515;

  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const receiveUrl = "https://example.com/pay/123";

  return (
    <div className="space-y-4">
      <div className="bg-muted/40 flex flex-col gap-2 rounded-md px-3 py-2 text-sm sm:flex-row sm:items-center sm:gap-5">
        <div className="text-muted-foreground flex items-center gap-2">
          <Coins className="h-4 w-4 shrink-0" />
          <span className="leading-none">
            Баланс
            <span className="mx-1.5">·</span>
            <span className="text-foreground font-semibold tabular-nums">{balance}</span>
          </span>
        </div>

        <div className="bg-background inline-flex w-full items-center justify-between rounded-md border shadow-sm sm:w-auto">
          <ButtonGroup className="flex w-full sm:w-auto">
            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-muted h-8 flex-1 px-3 text-sm sm:flex-none"
              onClick={() => setWithdrawOpen(true)}
            >
              <ArrowUp className="mr-1.5 h-4 w-4" />
              <span className="sm:inline">Отправить</span>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-muted h-8 flex-1 px-3 text-sm sm:flex-none"
              onClick={() => setDepositOpen(true)}
            >
              <ArrowDown className="mr-1.5 h-4 w-4" />
              <span className="sm:inline">Получить</span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <DataTable columns={transactionColumns} data={data} pageSize={10} emptyMessage="Транзакций нет" />

      <ReceiveDialog open={depositOpen} onOpenChange={setDepositOpen} receiveUrl={receiveUrl} />
      <SendDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} balance={balance} />
    </div>
  );
}
