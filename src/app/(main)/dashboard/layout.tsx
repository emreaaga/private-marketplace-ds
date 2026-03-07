import { ReactNode } from "react";

import { cookies } from "next/headers";

import { Separator } from "@/shared/ui/atoms/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/atoms/sidebar";
import { AppSidebar } from "@/shared/ui/organisms/sidebar/app-sidebar";
import { MobileBottomNavClient } from "@/shared/ui/organisms/sidebar/mobile-bottom-nav-client";
import { SearchDialog } from "@/shared/ui/organisms/sidebar/search-dialog";
import { ThemeSwitcher } from "@/shared/ui/organisms/sidebar/theme-switcher";

async function getUserFromCookies() {
  const cookieStore = await cookies();
  const meta = cookieStore.get("user_metadata")?.value;

  if (!meta) return null;

  try {
    return JSON.parse(decodeURIComponent(meta));
  } catch {
    return null;
  }
}

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getUserFromCookies();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset className="mx-auto max-w-screen-2xl">
        <header className="bg-background/50 sticky top-0 z-50 flex h-12 items-center border-b backdrop-blur-md">
          <div className="flex w-full items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-1 lg:gap-2">
              <SidebarTrigger className="-ml-1 hidden md:flex" />
              <Separator orientation="vertical" className="mx-2 hidden h-4 md:flex" />
              <SearchDialog />
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        <div className="h-full p-4 md:p-6">{children}</div>
      </SidebarInset>

      <MobileBottomNavClient />
    </SidebarProvider>
  );
}
