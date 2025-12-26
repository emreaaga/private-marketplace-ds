import { ArrowDown, ArrowUp } from "lucide-react";

import { Transaction } from "./transactions-columns";

interface TransactionCardProps {
  tx: Transaction;
}

export function TransactionCard({ tx }: TransactionCardProps) {
  const isIn = tx.type === "in";

  return (
    <div className="bg-background flex items-center gap-3 px-3 py-1.5">
      <div className={isIn ? "text-emerald-600" : "text-rose-600"}>
        {isIn ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span className="text-xs">{isIn ? "Поступление" : "Списание"}</span>
        <span className="text-muted-foreground truncate font-mono text-[11px]">{tx.id}</span>
      </div>
      <span
        className={
          isIn
            ? "shrink-0 font-medium text-emerald-600 tabular-nums"
            : "shrink-0 font-medium text-rose-600 tabular-nums"
        }
      >
        {isIn ? "+" : "−"}
        {tx.amount}
      </span>
      <span className="text-muted-foreground shrink-0 text-[10px]">{tx.date}</span>
    </div>
  );
}
