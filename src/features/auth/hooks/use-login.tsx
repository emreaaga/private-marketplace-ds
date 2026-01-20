"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authService } from "@/features/auth/api/auth";
import { useAuthStore } from "@/features/auth/auth.store";

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore.getState().setSession;

  const login = async (email: string, password: string) => {
    try {
      const res = await authService.login({ email, password });

      setSession({
        user: {
          id: String(res.user.id),
          role: res.user.role,
        },
        accessToken: res.accessToken,
      });

      toast.success("Вход выполнен успешно!");
      router.push("/dashboard/main");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка входа");
      throw err;
    }
  };

  return { login };
}
