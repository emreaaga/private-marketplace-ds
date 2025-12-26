import { ArrowDown, ArrowUp, Coins } from "lucide-react";

import type { Transaction } from "./transactions-columns";

interface TransactionCardProps {
  tx: Transaction;
}

export function TransactionCard({ tx }: TransactionCardProps) {
  const formatAmount = (amount: number) => {
    if (amount > 99999) return "99999+";
    return amount.toString().padStart(5, " ");
  };

  return (
    <div className="w-full">
      <table className="w-full table-fixed text-xs">
        <tbody>
          <tr className="bg-background">
            <td className="text-muted-foreground w-[50px] px-2 py-1.5 font-mono text-[10px]">{tx.id}</td>

            <td className="w-[80px] px-2 py-1.5">
              <div className="flex items-center gap-1 text-green-600">
                <Coins className="h-3 w-3 shrink-0 text-yellow-600" />
                <span className="font-mono tabular-nums">{formatAmount(tx.amount)}</span>
              </div>
            </td>

            <td className="w-[90px] px-2 py-1.5">
              <div className="flex items-center gap-1">
                <ArrowUp className="h-3 w-3 shrink-0 text-rose-600" />
                <span className="truncate text-[10px]" title={tx.sender}>
                  {tx.sender}
                </span>
              </div>
            </td>

            <td className="w-[90px] px-2 py-1.5">
              <div className="flex items-center gap-1">
                <ArrowDown className="h-3 w-3 shrink-0 text-emerald-600" />
                <span className="truncate text-[10px]" title={tx.receiver}>
                  {tx.receiver}
                </span>
              </div>
            </td>

            <td className="text-muted-foreground w-[70px] px-2 py-1.5 text-right text-[10px]">{tx.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
