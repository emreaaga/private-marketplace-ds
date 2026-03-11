"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { ListFilter, LucideIcon, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { canAccess } from "@/shared/config/permissions";
import { UserAuth } from "@/shared/types/users/user.auth";

import { CreateDropdown } from "../create-dropdown";

const loadUser = () => import("../forms/create-user-dialog");
const loadCompany = () => import("../../../../companies/ui/organisms/create-company-dialog");
const loadService = () => import("@/features/services/ui/organisms/create-service-dialog");

const CreateUserDialog = dynamic(loadUser, { ssr: false });
const CreateCompanyDialog = dynamic(loadCompany, { ssr: false });
const CreateServiceDialog = dynamic(loadService, { ssr: false });

type DialogType = "user" | "company" | "service" | null;

const DIALOGS = {
  user: CreateUserDialog,
  company: CreateCompanyDialog,
  service: CreateServiceDialog,
} as const;

interface UsersToolbarProps {
  readonly user: UserAuth | null;
}

export function UsersToolbar({ user }: UsersToolbarProps) {
  const [dialog, setDialog] = useState<DialogType>(null);

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const canCreateUser = isAdmin;
  const canCreateCompany = isAdmin;

  const canCreateService = canAccess("/dashboard/users/services", user);

  const ActiveDialog = dialog ? DIALOGS[dialog] : null;

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 py-1">
        <div className="flex max-w-2xl flex-1 items-center gap-2">
          <div className="group relative flex flex-1 items-center">
            <Search className="text-muted-foreground/40 group-focus-within:text-primary/70 absolute left-2.5 h-3.5 w-3.5 transition-colors" />
            <input
              placeholder="Поиск пользователей..."
              className="border-border/40 bg-background/50 placeholder:text-muted-foreground/40 focus:border-border/80 focus:bg-background focus:ring-primary/5 hover:border-border/60 h-8 w-full rounded-md border pr-3 pl-8 text-[13px] shadow-sm transition-all focus:ring-1 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <ToolbarButton Icon={SlidersHorizontal} label="Сортировка" />
            <ToolbarButton Icon={ListFilter} label="Фильтры" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="border-border/40 text-muted-foreground/50 hover:bg-muted hover:border-border/80 hover:text-muted-foreground bg-background/50 flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition-all active:scale-95"
            title="Сбросить фильтры"
          >
            <RotateCcw size={13} strokeWidth={2.5} />
          </button>

          <CreateDropdown
            onCreateUserAction={canCreateUser ? () => setDialog("user") : undefined}
            onHoverUserAction={canCreateUser ? loadUser : undefined}
            onCreateCompanyAction={canCreateCompany ? () => setDialog("company") : undefined}
            onHoverCompanyAction={canCreateCompany ? loadCompany : undefined}
            onCreateServiceAction={canCreateService ? () => setDialog("service") : undefined}
            onHoverServiceAction={canCreateService ? loadService : undefined}
          />
        </div>
      </div>

      {ActiveDialog && (
        <ActiveDialog
          open={true}
          onOpenChangeAction={(open: boolean) => {
            if (!open) setDialog(null);
          }}
        />
      )}
    </>
  );
}

function ToolbarButton({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <button className="border-border/40 text-muted-foreground/70 hover:bg-muted hover:border-border/80 hover:text-foreground bg-background/50 flex h-8 items-center gap-2 rounded-md border px-2.5 text-[12px] font-medium shadow-sm transition-all active:scale-95">
      <Icon size={14} strokeWidth={2} className="text-muted-foreground/40" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
