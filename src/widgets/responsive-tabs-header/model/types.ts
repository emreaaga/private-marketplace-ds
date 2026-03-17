import { UserAuth } from "@/entities/user";

import { HeaderIconKey } from "./icon-map";

export interface HeaderTabItem {
  href: string;
  label: string;
  icon?: HeaderIconKey;
}

export interface ResponsiveTabsHeaderProps {
  readonly items: readonly HeaderTabItem[];
  readonly user: UserAuth | null;
}
