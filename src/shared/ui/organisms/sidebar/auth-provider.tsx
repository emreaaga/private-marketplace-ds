"use client";

import { ReactNode, useEffect } from "react";

import { useAuthStore } from "@/features/auth/auth.store";

type Session = {
  user: {
    id: string;
    role: string;
  };
  accessToken: string;
} | null;

export function AuthProvider({ children, initialSession }: { children: ReactNode; initialSession: Session }) {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession, setSession]);

  return <>{children}</>;
}
