import { ReactNode } from "react";

import { cookies } from "next/headers";

import { getServerSession } from "@/entities/session/server";
import { Separator } from "@/shared/ui/atoms/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/atoms/sidebar";
import { AppSidebar } from "@/widgets/app-sidebar";
import { MobileBottomNavClient } from "@/widgets/app-sidebar/ui/mobile-bottom-nav-client";
import { SearchDialog } from "@/widgets/app-sidebar/ui/search-dialog";
import { ThemeSwitcher } from "@/widgets/app-sidebar/ui/theme-switcher";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getServerSession();

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";
  const theme = (cookieStore.get("theme_mode")?.value as "light" | "dark") || "light";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
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
              <ThemeSwitcher initialTheme={theme} />
            </div>
          </div>
        </header>

        <div className="h-full p-4 md:p-6">{children}</div>
      </SidebarInset>

      <MobileBottomNavClient />
    </SidebarProvider>
  );
}
