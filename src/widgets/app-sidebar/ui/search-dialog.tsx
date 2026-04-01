"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  BarChart3,
  ClipboardList,
  Database,
  Loader2,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCartIcon,
  StoreIcon,
  Trash2,
  UserCircle,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { useDashboardDev } from "@/entities/dashboard";
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
  { group: "Дашборды", icon: BarChart3, label: "Главная", href: "/dashboard/main" },
  { group: "Дашборды", icon: Users, label: "Пользователи", href: "/dashboard/users" },
  { group: "Дашборды", icon: UserCircle, label: "Клиенты", href: "/dashboard/clients" },
  { group: "Дашборды", icon: ShoppingBag, label: "Продукты", href: "/dashboard/products/main" },
  { group: "Дашборды", icon: StoreIcon, label: "Витрина", href: "/dashboard/products/store" },
  { group: "Дашборды", icon: ShoppingCartIcon, label: "Корзина", href: "/dashboard/products/order-cart" },
  { group: "Дашборды", icon: ClipboardList, label: "Заказы", href: "/dashboard/orders" },
  { group: "Дашборды", icon: Settings, label: "Настройки", href: "/dashboard/settings/roles" },
];

const groups = [...new Set(searchItems.map((item) => item.group))];

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const { seedData, isSeeding, clearData, isClearing } = useDashboardDev();

  const handleSeedData = async () => {
    setOpen(false);
    const toastId = toast.loading("Генерация тестовых данных...");
    try {
      await seedData();
      toast.success("Данные успешно созданы", { id: toastId });
      router.refresh();
    } catch {
      // Обработка ошибки
    }
  };

  const handleClearData = async () => {
    setOpen(false);
    const toastId = toast.loading("Очистка базы данных и сброс ID...");
    try {
      await clearData();
      toast.success("База идеально чиста: ID сброшены в 1", { id: toastId });
      router.refresh();
    } catch {
      // Обработка ошибки
    }
  };

  return (
    <>
      <Button
        variant="link"
        className="text-muted-foreground px-0! font-normal hover:no-underline"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        <span className="ml-2">Поиск</span>
        {(isSeeding || isClearing) && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
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

          <CommandSeparator />
          <CommandGroup heading="Разработка">
            <CommandItem
              onSelect={handleSeedData}
              disabled={isSeeding || isClearing}
              className="aria-selected:bg-yellow-50 aria-selected:text-yellow-900"
            >
              {isSeeding ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Database className="mr-2 h-4 w-4 text-yellow-600" />
              )}
              <div className="flex flex-col">
                <span>Сгенерировать тестовые данные</span>
                <span className="text-[10px] opacity-50">5 компаний × 5 отправок × 10 заказов</span>
              </div>
              <Zap className="ml-auto h-3 w-3 fill-yellow-500 text-yellow-500 opacity-50" />
            </CommandItem>

            <CommandItem
              onSelect={handleClearData}
              disabled={isSeeding || isClearing}
              className="aria-selected:bg-red-50 aria-selected:text-red-900"
            >
              {isClearing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4 text-red-600" />
              )}
              <div className="flex flex-col">
                <span>Очистить все таблицы</span>
                <span className="font-mono text-[10px] text-red-600/70 opacity-50">TRUNCATE ... RESTART IDENTITY</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
