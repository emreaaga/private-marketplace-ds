import { Eye } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

import { type Order, STATUS_MAP } from "./orders.type";

interface Props {
  order: Order;
}

export function SellersOrdersMobileCard({ order }: Props) {
  const statusCfg = STATUS_MAP[order.status];
  const StatusIcon = statusCfg.icon;

  return (
    <div className="flex items-center gap-3 px-3 py-2">
      {/* Main info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="shrink-0 font-mono text-xs">{order.id}</span>
          <span className="text-muted-foreground truncate text-[11px]">
            {order.sender.city} → {order.recipient.city}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-medium">{order.recipient.name}</span>
          <span className="text-muted-foreground text-[10px]">{order.date}</span>
        </div>
      </div>

      {/* Status */}
      <div
        className={`inline-flex h-6 shrink-0 items-center gap-1 rounded-md border px-2 text-xs ${statusCfg.className}`}
        title={statusCfg.label}
      >
        <StatusIcon className="h-3.5 w-3.5" />
      </div>

      {/* Actions */}
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-7 w-7">
        <Eye className="h-4 w-4" />
      </Button>
    </div>
  );
}
