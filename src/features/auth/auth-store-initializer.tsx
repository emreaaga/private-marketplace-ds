"use client";

import { useRef } from "react";

import { AuthUser, useAuthStore } from "@/features/auth/auth.store";

export function AuthStoreInitializer({ user }: { user: AuthUser | null }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useAuthStore.getState().setSession(user);
    initialized.current = true;
  }

  return null;
}
