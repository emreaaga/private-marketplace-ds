import { ReactNode } from "react";

import { cookies } from "next/headers";

import { AppSidebar } from "@/app/(main)/dashboard/_components/sidebar/app-sidebar";
import { MobileBottomNav } from "@/app/(main)/dashboard/_components/sidebar/mobile-bottom-nav";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { sidebarItems } from "@/navigation/sidebar/sidebar-items";
import { getPreference } from "@/server/server-actions";
import {
  CONTENT_LAYOUT_VALUES,
  NAVBAR_STYLE_VALUES,
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
  type ContentLayout,
  type NavbarStyle,
  type SidebarCollapsible,
  type SidebarVariant,
} from "@/types/preferences/layout";

import { AuthProvider } from "./_components/auth-provider";
import { SearchDialog } from "./_components/sidebar/search-dialog";
import { ThemeSwitcher } from "./_components/sidebar/theme-switcher";

// 📱 импортируем твой bottom nav

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const [sidebarVariant, sidebarCollapsible, contentLayout, navbarStyle] = await Promise.all([
    getPreference<SidebarVariant>("sidebar_variant", SIDEBAR_VARIANT_VALUES, "inset"),
    getPreference<SidebarCollapsible>("sidebar_collapsible", SIDEBAR_COLLAPSIBLE_VALUES, "icon"),
    getPreference<ContentLayout>("content_layout", CONTENT_LAYOUT_VALUES, "centered"),
    getPreference<NavbarStyle>("navbar_style", NAVBAR_STYLE_VALUES, "scroll"),
  ]);

  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        {/* 🖥 ДЕСКТОПНЫЙ SIDEBAR — скрываем на мобилках */}
        <div className="hidden md:block">
          <AppSidebar variant={sidebarVariant} collapsible={sidebarCollapsible} />
        </div>

        <SidebarInset
          data-content-layout={contentLayout}
          className={cn(
            "data-[content-layout=centered]:!mx-auto data-[content-layout=centered]:max-w-screen-2xl",
            "max-[113rem]:peer-data-[variant=inset]:!mr-2 min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:!mr-auto",
          )}
        >
          <header
            data-navbar-style={navbarStyle}
            className={cn(
              "flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear",
              "data-[navbar-style=sticky]:bg-background/50 data-[navbar-style=sticky]:sticky data-[navbar-style=sticky]:top-0 data-[navbar-style=sticky]:z-50 data-[navbar-style=sticky]:overflow-hidden data-[navbar-style=sticky]:rounded-t-[inherit] data-[navbar-style=sticky]:backdrop-blur-md",
            )}
          >
            <div className="flex w-full items-center justify-between px-4 lg:px-6">
              <div className="flex items-center gap-1 lg:gap-2">
                {/* 🖥 SidebarTrigger только на DESKTOP */}
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

        {/* 📱 Нижняя навигация только на мобилках */}
        <div className="md:hidden">
          <MobileBottomNav items={sidebarItems} />
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
