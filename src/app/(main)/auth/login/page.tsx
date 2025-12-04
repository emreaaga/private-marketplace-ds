import Link from "next/link";

import { Command } from "lucide-react";

import { LoginForm } from "@/features/auth/ui/organisms/login-form";

export default function LoginV1() {
  return (
    <div className="flex h-dvh">
      <div className="bg-primary hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <Command className="text-primary-foreground mx-auto size-12" />
            <div className="space-y-2">
              <p className="text-primary-foreground/80 text-xl">Войдите, чтобы продолжить</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="font-medium tracking-tight">Вход</div>
            <div className="text-muted-foreground mx-auto max-w-xl">С возвращением. Введите свой email и пароль.</div>
          </div>
          <div className="space-y-4">
            <LoginForm />
            <p className="text-muted-foreground text-center text-xs">
              Нет аккаунта?{" "}
              <Link prefetch={false} href="register" className="text-primary">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
