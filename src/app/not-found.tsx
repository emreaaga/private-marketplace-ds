"use client";

import Link from "next/link";

import { HomeIcon } from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/shared/ui/atoms/empty";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="mask-b-from-20% mask-b-to-80% text-9xl font-extrabold">404</EmptyTitle>
          <EmptyDescription className="text-foreground/80 -mt-8 text-nowrap">
            Страница, которую вы ищете, не найдена.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link prefetch={false} replace href="/dashboard/main">
              <HomeIcon data-icon="inline-start" />
              На главную
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}
