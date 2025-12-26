"use client";

import { Copy, QrCode } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/shared/ui/atoms/input-group";

interface ReceiveFormProps {
  receiveUrl: string;
}

export function ReceiveForm({ receiveUrl }: ReceiveFormProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="flex flex-col items-center gap-3">
        <div className="bg-background flex h-44 w-full items-center justify-center rounded-md border">
          <QrCode className="text-muted-foreground h-full w-full" />
        </div>
      </div>

      <InputGroup>
        <InputGroupInput disabled value={receiveUrl} />
        <InputGroupAddon>
          <InputGroupButton className="rounded-full" size="icon-sm">
            <Copy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
