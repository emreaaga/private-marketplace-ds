import { ArrowDown, ArrowUp } from "lucide-react";

import { Transaction } from "./transactions-columns";

interface TransactionCardProps {
  tx: Transaction;
}

export function TransactionCard({ tx }: TransactionCardProps) {
  const isIn = tx.type === "in";

  return (
    <div className="bg-background space-y-2 rounded-md border p-3">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground font-mono text-xs">{tx.id}</span>
        <span className="text-muted-foreground text-xs">{tx.date}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isIn ? <ArrowDown className="h-4 w-4 text-emerald-600" /> : <ArrowUp className="h-4 w-4 text-rose-600" />}
          <span className="text-sm">{isIn ? "Поступление" : "Списание"}</span>
        </div>

        <span className={isIn ? "font-medium text-emerald-600 tabular-nums" : "font-medium text-rose-600 tabular-nums"}>
          {isIn ? "+" : "−"}
          {tx.amount}
        </span>
      </div>
    </div>
  );
}
