"use client";

import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

import { authService } from "@/features/auth/api/auth";
import { useAuthStore } from "@/features/auth/auth.store";
import { AccessTokenPayload } from "@/features/auth/types/auth.types";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore.getState().setUser;

  const login = async (email: string, password: string) => {
    try {
      const res = await authService.login({ email, password });

      const decoded = jwtDecode<AccessTokenPayload>(res.accessToken);

      setUser({
        id: decoded.sub,
        role: decoded.role,
      });

      router.push("/dashboard/main");
      toast.success("Вход выполнен успешно!");
    } catch (err) {
      console.log(err);
      toast.error("Ошибка запроса");
      throw err;
    }
  };

  return { login };
}
