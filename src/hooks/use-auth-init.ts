"use client";

import { useEffect, useState } from "react";

import { authService } from "@/services/auth";

export function useAuthInit() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await authService.refresh();
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
