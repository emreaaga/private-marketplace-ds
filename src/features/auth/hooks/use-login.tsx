"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authService } from "@/features/auth/api/auth";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === "true";

export function useLogin() {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    if (IS_DEMO) {
      if (email === "test@gmail.com" && password === "test123") {
        router.push("/dashboard/main");
        return;
      } else {
        toast.error("Неверный demo логин или пароль");
        throw new Error("DEMO_INVALID");
      }
    }

    try {
      await authService.login({ email, password });
      toast.success("Вход выполнен успешно!");
      router.push("/dashboard/main");
    } catch (err) {
      console.log(err);
      toast.error("Ошибка запроса");
      throw err;
    }
  };

  return { login };
}
