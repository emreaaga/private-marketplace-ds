"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authService } from "@/features/auth/api/auth";

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.login({ email, password });

      toast.success("Вход выполнен успешно!");

      router.push("/dashboard/main");
      router.refresh();
    } catch {
      toast.error("Неверный логин или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
