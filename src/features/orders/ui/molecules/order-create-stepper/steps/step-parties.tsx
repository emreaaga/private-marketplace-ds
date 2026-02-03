"use client";

import type { ClientForm } from "@/shared/types/client/client.form";

import { PartyFields } from "../party-fields";

export function StepParties({
  sender,
  receiver,
  onSenderChangeAction,
  onReceiverChangeAction,
}: {
  sender: ClientForm;
  receiver: ClientForm;
  onSenderChangeAction: (patch: Partial<ClientForm>) => void;
  onReceiverChangeAction: (patch: Partial<ClientForm>) => void;
}) {
  return (
    <div className="space-y-4">
      <PartyFields title="Отправитель" value={sender} onChangeAction={onSenderChangeAction} />
      <PartyFields title="Получатель" value={receiver} onChangeAction={onReceiverChangeAction} />
    </div>
  );
}
