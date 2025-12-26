"use client";

import { Coins, User } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/atoms/input-group";

interface SendFormProps {
  userBalance: number;
}

export default function SendForm({ userBalance }: SendFormProps) {
  return (
    <div className="space-y-4 py-4">
      <div className="bg-muted rounded-md px-3 py-2 text-sm">
        Доступно: <span className="tabular-nims font-medium">{userBalance}</span>
      </div>

      <InputGroup>
        <InputGroupInput placeholder="Получатель" />
        <InputGroupAddon>
          <User />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Сумма" />
        <InputGroupAddon>
          <Coins />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
