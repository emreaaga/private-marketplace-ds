import Link from "next/link";

import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-md">
        <Lock className="text-primary mx-auto mb-4 size-12" />
        <h1 className="text-2xl font-bold">Доступ ограничен</h1>
        <p className="text-muted-foreground mt-2">У вас недостаточно прав для этого раздела.</p>
        <div className="mt-6">
          <Link href="/dashboard/main" className="bg-primary text-primary-foreground rounded-md px-4 py-2">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
