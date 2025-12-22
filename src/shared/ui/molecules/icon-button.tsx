import type { LucideIcon } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";

export function IconButton({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex h-9 flex-1 items-center justify-center gap-2 p-0 md:flex-none md:px-3"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden md:inline">{label}</span>
    </Button>
  );
}
