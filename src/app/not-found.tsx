"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/atoms/button";

export default function NotFound() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center space-y-2 text-center">
      <h1 className="text-2xl font-semibold">Страница не найдена.</h1>
      <p className="text-muted-foreground">Страница, которую вы ищете, не найдена.</p>
      <Link prefetch={false} replace href="/dashboard/main">
        <Button variant="outline">Вернуться на главную</Button>
      </Link>
    </div>
  );
}
