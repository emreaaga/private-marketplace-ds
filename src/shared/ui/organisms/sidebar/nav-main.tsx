"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight, PlusCircleIcon } from "lucide-react";

import { type NavGroup, type NavMainItem } from "@/features/sidebar/types/sidebar.types";
import { canAccess as checkPermissions } from "@/shared/config/permissions";
import { type UserAuth } from "@/shared/types/users/user.auth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/atoms/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/atoms/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/shared/ui/atoms/sidebar";

interface NavMainProps {
  readonly items: readonly NavGroup[];
  readonly user: UserAuth | null;
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">Soon</span>
);

const NavItemExpanded = ({
  item,
  isActive,
  isSubmenuOpen,
}: {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavMainItem["subItems"]) => boolean;
  isSubmenuOpen: (subItems?: NavMainItem["subItems"]) => boolean;
}) => {
  return (
    <Collapsible key={item.title} asChild defaultOpen={isSubmenuOpen(item.subItems)} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {item.subItems ? (
            <SidebarMenuButton
              disabled={item.comingSoon}
              isActive={isActive(item.url, item.subItems)}
              tooltip={item.title}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              {item.comingSoon && <IsComingSoon />}
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton
              asChild
              aria-disabled={item.comingSoon}
              isActive={isActive(item.url)}
              tooltip={item.title}
            >
              <Link prefetch={false} href={item.url} target={item.newTab ? "_blank" : undefined}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                {item.comingSoon && <IsComingSoon />}
              </Link>
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        {item.subItems && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton aria-disabled={subItem.comingSoon} isActive={isActive(subItem.url)} asChild>
                    <Link prefetch={false} href={subItem.url} target={subItem.newTab ? "_blank" : undefined}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                      {subItem.comingSoon && <IsComingSoon />}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};

const NavItemCollapsed = ({
  item,
  isActive,
}: {
  item: NavMainItem;
  isActive: (url: string, subItems?: NavMainItem["subItems"]) => boolean;
}) => {
  return (
    <SidebarMenuItem key={item.title}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            disabled={item.comingSoon}
            tooltip={item.title}
            isActive={isActive(item.url, item.subItems)}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50 space-y-1" side="right" align="start">
          {item.subItems?.map((subItem) => (
            <DropdownMenuItem key={subItem.title} asChild>
              <SidebarMenuSubButton
                key={subItem.title}
                asChild
                className="focus-visible:ring-0"
                aria-disabled={subItem.comingSoon}
                isActive={isActive(subItem.url)}
              >
                <Link prefetch={false} href={subItem.url} target={subItem.newTab ? "_blank" : undefined}>
                  {subItem.icon && <subItem.icon className="[&>svg]:text-sidebar-foreground" />}
                  <span>{subItem.title}</span>
                  {subItem.comingSoon && <IsComingSoon />}
                </Link>
              </SidebarMenuSubButton>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export function NavMain({ items, user }: NavMainProps) {
  const path = usePathname();
  const { state, isMobile } = useSidebar();

  if (!user) return null;

  const canCreateUser = checkPermissions("/dashboard/users/main", user);

  const getBasePath = (url: string) => {
    const segments = url.split("/").filter(Boolean);
    return segments.length >= 2 ? `/${segments.slice(0, 2).join("/")}` : url;
  };

  const isItemActive = (url: string, subItems?: NavMainItem["subItems"]) => {
    const itemBasePath = getBasePath(url);
    const currentBasePath = getBasePath(path);

    if (subItems?.length) {
      return subItems.some((sub) => {
        const subBasePath = getBasePath(sub.url);
        return path === sub.url || path.startsWith(sub.url + "/") || currentBasePath === subBasePath;
      });
    }

    return (
      path === url ||
      currentBasePath === itemBasePath ||
      path.startsWith(url + "/") ||
      path.startsWith(itemBasePath + "/")
    );
  };

  const isSubmenuOpen = (subItems?: NavMainItem["subItems"]) => {
    if (!subItems?.length) return false;
    const currentBasePath = getBasePath(path);
    return subItems.some((sub) => {
      const subBasePath = getBasePath(sub.url);
      return path === sub.url || path.startsWith(sub.url + "/") || currentBasePath === subBasePath;
    });
  };

  return (
    <>
      {canCreateUser && (
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Создать пользователя"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <PlusCircleIcon />
                  <span>Создать пользователя</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {items.map((group, index) => {
        const visibleItems = group.items
          .filter((item) => checkPermissions(item.url, user))
          .map((item) => ({
            ...item,
            subItems: item.subItems ? item.subItems.filter((sub) => checkPermissions(sub.url, user)) : undefined,
          }))
          .filter((item) => !item.subItems || item.subItems.length > 0 || item.url !== "#");

        if (visibleItems.length === 0) return null;

        return (
          <React.Fragment key={group.id}>
            {index !== 0 && <SidebarSeparator className="mx-0 my-2 opacity-50" />}

            <SidebarGroup>
              <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                  {visibleItems.map((item) => {
                    // Обработка свернутого состояния (Collapsed)
                    if (state === "collapsed" && !isMobile) {
                      if (!item.subItems) {
                        return (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              aria-disabled={item.comingSoon}
                              tooltip={item.title}
                              isActive={isItemActive(item.url)}
                            >
                              <Link prefetch={false} href={item.url} target={item.newTab ? "_blank" : undefined}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      }
                      return <NavItemCollapsed key={item.title} item={item} isActive={isItemActive} />;
                    }

                    return (
                      <NavItemExpanded
                        key={item.title}
                        item={item}
                        isActive={isItemActive}
                        isSubmenuOpen={isSubmenuOpen}
                      />
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </React.Fragment>
        );
      })}
    </>
  );
}
