"use client";
import { PartyFields } from "../party-fields";
import { Party } from "../types";

export function StepParties({
  sender,
  receiver,
  onSenderChange,
  onReceiverChange,
}: {
  sender: Party;
  receiver: Party;
  onSenderChange: (patch: Partial<Party>) => void;
  onReceiverChange: (patch: Partial<Party>) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <PartyFields title="Отправитель" value={sender} onChange={onSenderChange} />
      <PartyFields title="Получатель" value={receiver} onChange={onReceiverChange} />
    </div>
  );
}
