"use client";

import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { authService } from "@/features/auth/api/auth";
import { useAuthStore } from "@/features/auth/auth.store";
import { AccessTokenPayload } from "@/features/auth/types/auth.types";

export function useAuthInit() {
  const [isInitialized, setIsInitialized] = useState(false);
  const setUser = useAuthStore.getState().setUser;

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await authService.refresh();
        const decoded = jwtDecode<AccessTokenPayload>(res.accessToken);
        setUser({
          id: decoded.sub,
          role: decoded.role,
        });
      } catch {
        console.log("No valid refresh token");
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  return { isInitialized };
}
