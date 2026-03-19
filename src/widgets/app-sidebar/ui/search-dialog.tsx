"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  BarChart3,
  ClipboardList,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCartIcon,
  StoreIcon,
  UserCircle,
  Users,
} from "lucide-react";

import { Button } from "@/shared/ui/atoms/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/ui/atoms/command";

const searchItems = [
  { group: "Dashboards", icon: BarChart3, label: "Главная", href: "/dashboard/main" },
  { group: "Dashboards", icon: Users, label: "Пользователи", href: "/dashboard/users" },
  { group: "Dashboards", icon: UserCircle, label: "Клиенты", href: "/dashboard/clients" },
  { group: "Dashboards", icon: ShoppingBag, label: "Продукты", href: "/dashboard/products/main" },
  { group: "Dashboards", icon: StoreIcon, label: "Витрина", href: "/dashboard/products/store" },
  { group: "Dashboards", icon: ShoppingCartIcon, label: "Корзина", href: "/dashboard/products/order-cart" },
  { group: "Dashboards", icon: ClipboardList, label: "Заказы", href: "/dashboard/orders" },
  { group: "Dashboards", icon: Settings, label: "Настройки", href: "/dashboard/settings/roles" },
];

const groups = [...new Set(searchItems.map((item) => item.group))];

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground px-0! font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="ml-2">Поиск</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Поиск по разделам..." />
        <CommandList>
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          {groups.map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem
                      key={item.href}
                      onSelect={() => {
                        router.push(item.href);
                        setOpen(false);
                      }}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
