"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { User } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/atoms/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/atoms/tabs";

const items = [
  {
    href: "/dashboard/users/main",
    label: "Пользователи",
    icon: User,
  },
];

export function UsersHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = items.find((item) => pathname.startsWith(item.href))?.href ?? items[0].href;

  return (
    <>
      <div className="sm:hidden">
        <Select value={activeTab} onValueChange={(value) => router.push(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:block">
        <Tabs value={activeTab}>
          <TabsList className="scrollbar-none flex gap-2 overflow-x-auto whitespace-nowrap sm:overflow-visible">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <TabsTrigger key={item.href} value={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2 px-3 py-2 text-sm">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
