import { Copy } from "lucide-react";

import { Button } from "../atoms/button";

export function CopyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/50 flex items-center gap-2 rounded-md p-2">
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="truncate font-mono text-sm">{value}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigator.clipboard.writeText(value)}
        aria-label={`Copy ${label}`}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
