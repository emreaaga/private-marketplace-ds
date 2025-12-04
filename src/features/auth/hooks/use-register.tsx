"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authService } from "@/features/auth/api/auth";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === "true";

export function useRegister() {
  const router = useRouter();

  const register = async (name: string, email: string, password: string) => {
    if (IS_DEMO) {
      toast.success("Регистрация прошла успешно! (DEMO)");
      return;
    }

    try {
      await authService.register({ name, email, password });
      toast.success("Регистрация прошла успешно!");
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при регистрации");
      throw err;
    }
  };

  return { register };
}
