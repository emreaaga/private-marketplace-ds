import { ReactNode } from "react";

import { cookies } from "next/headers";

import { sidebarItems } from "@/features/sidebar/sidebar-items";
import { getPreference } from "@/shared/lib/server-actions";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/atoms/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/shared/ui/atoms/sidebar";
import { AppSidebar } from "@/shared/ui/organisms/sidebar/app-sidebar";
import { AuthProvider } from "@/shared/ui/organisms/sidebar/auth-provider";
import { MobileBottomNav } from "@/shared/ui/organisms/sidebar/mobile-bottom-nav";
import {
  CONTENT_LAYOUT_VALUES,
  NAVBAR_STYLE_VALUES,
  SIDEBAR_COLLAPSIBLE_VALUES,
  SIDEBAR_VARIANT_VALUES,
  type ContentLayout,
  type NavbarStyle,
  type SidebarCollapsible,
  type SidebarVariant,
} from "@/shared/ui/organisms/sidebar/preferences/layout";
import { SearchDialog } from "@/shared/ui/organisms/sidebar/search-dialog";
import { ThemeSwitcher } from "@/shared/ui/organisms/sidebar/theme-switcher";

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
        <div className="hidden md:block">
          <AppSidebar variant={sidebarVariant} collapsible={sidebarCollapsible} />
        </div>

        <SidebarInset
          data-content-layout={contentLayout}
          className={cn(
            "data-[content-layout=centered]:mx-auto! data-[content-layout=centered]:max-w-screen-2xl",
            "max-[113rem]:peer-data-[variant=inset]:mr-2! min-[101rem]:peer-data-[variant=inset]:peer-data-[state=collapsed]:mr-auto!",
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

        <div className="md:hidden">
          <MobileBottomNav items={sidebarItems} />
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
