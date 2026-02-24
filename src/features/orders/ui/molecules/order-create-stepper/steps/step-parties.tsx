"use client";

import type { ClientForm } from "@/shared/types/client/client.form";

import { PartyFields } from "../party-fields";

export function StepParties({
  sender,
  receiver,
  onSenderChangeAction,
  onReceiverChangeAction,
  readOnly = false, // <-- Добавили флаг
}: {
  sender: ClientForm;
  receiver: ClientForm;
  onSenderChangeAction?: (patch: Partial<ClientForm>) => void; // Сделали опциональным
  onReceiverChangeAction?: (patch: Partial<ClientForm>) => void; // Сделали опциональным
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-4">
      <PartyFields title="Отправитель" value={sender} onChangeAction={onSenderChangeAction} readOnly={readOnly} />
      <PartyFields title="Получатель" value={receiver} onChangeAction={onReceiverChangeAction} readOnly={readOnly} />
    </div>
  );
}
