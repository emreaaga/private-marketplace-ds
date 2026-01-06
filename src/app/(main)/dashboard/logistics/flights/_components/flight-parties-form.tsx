"use client";

import { useState } from "react";

import { PartyFields } from "@/features/orders/ui/molecules/order-create-stepper/party-fields";
import type { Party } from "@/features/orders/ui/molecules/order-create-stepper/types";

const emptyParty: Party = {
  code: "",
  firstName: "",
  lastName: "",
  passport1: "",
  passport2: "",
  city: "",
  district: "",
  phone: "",
  address: "",
};

export function FlightPartiesForm() {
  const [sender, setSender] = useState<Party>(emptyParty);
  const [receiver, setReceiver] = useState<Party>(emptyParty);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <PartyFields
        title="Отправитель"
        value={sender}
        onChange={(patch) => setSender((prev) => ({ ...prev, ...patch }))}
      />

      <PartyFields
        title="Получатель"
        value={receiver}
        onChange={(patch) => setReceiver((prev) => ({ ...prev, ...patch }))}
      />
    </div>
  );
}
