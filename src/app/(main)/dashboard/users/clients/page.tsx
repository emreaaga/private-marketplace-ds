"use client";

import { UserSquare } from "lucide-react";

import { FeaturePlaceholder } from "@/shared/ui/feature-placeholder";

export default function ClientsPage() {
  return (
    <div className="flex flex-1 flex-col p-4">
      <FeaturePlaceholder
        title="Страница клиентов"
        description="Здесь фирмы добавляют и редактируют своих клиентов."
        icon={UserSquare}
      />
    </div>
  );
}
