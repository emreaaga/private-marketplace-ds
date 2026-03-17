"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  ShoppingBag,
  Forklift,
  Search,
  Users,
  ClipboardList,
  UserCircle,
  BarChart3,
  Settings,
  ShoppingCartIcon,
  StoreIcon,
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
  {
    group: "Dashboards",
    icon: BarChart3,
    label: "Главная",
    href: "/dashboard/main",
  },
  {
    group: "Dashboards",
    icon: Users,
    label: "Пользователи",
    href: "/dashboard/users",
  },
  {
    group: "Dashboards",
    icon: UserCircle,
    label: "Клиенты",
    href: "/dashboard/clients",
  },
  {
    group: "Dashboards",
    icon: ShoppingBag,
    label: "Продукты",
    href: "/dashboard/products/main",
  },
  {
    group: "Dashboards",
    icon: StoreIcon,
    label: "Витрина",
    href: "/dashboard/products/store",
  },
  {
    group: "Dashboards",
    icon: ShoppingCartIcon,
    label: "Корзина",
    href: "/dashboard/products/order-cart",
  },
  {
    group: "Dashboards",
    icon: ClipboardList,
    label: "Заказы",
    href: "/dashboard/orders",
  },
  {
    group: "Dashboards",
    icon: Settings,
    label: "Настройки",
    href: "/dashboard/settings/roles",
  },
  {
    group: "Dashboards",
    icon: Forklift,
    label: "Логистика",
    disabled: true,
    href: "/dashboard/logistics",
  },
  {
    group: "Authentication",
    label: "Login v1",
    href: "/auth/login",
  },
  {
    group: "Authentication",
    label: "Login v2",
    href: "/auth/login-v2",
  },
  {
    group: "Authentication",
    label: "Register v1",
    href: "/auth/register",
  },
  {
    group: "Authentication",
    label: "Register v2",
    href: "/auth/register-v2",
  },
];

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground px-0! font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Поиск
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Поиск по дашбордам и разделам" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}

              <CommandGroup heading={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem
                      key={item.label}
                      disabled={item.disabled}
                      className="py-1.5!"
                      onSelect={() => {
                        if (item.href && !item.disabled) {
                          router.push(item.href);
                        }
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
