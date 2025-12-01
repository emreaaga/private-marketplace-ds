"use client";
import { ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useAuthInit } from "@/hooks/use-auth-init";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isInitialized } = useAuthInit();

  if (!isInitialized) {
    return (
      <div className="from-background via-background to-muted/20 fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br backdrop-blur-md">
        <div className="bg-card flex flex-col items-center gap-4 rounded-lg border p-8 shadow-lg">
          <div className="relative">
            <Spinner />
          </div>
          <div className="space-y-1 text-center">
            <p className="text-sm font-medium">Загрузка</p>
            <p className="text-muted-foreground text-xs">Подождите немного...</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
