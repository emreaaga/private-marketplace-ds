import { usersHeaderItems } from "@/features/users/header-items";
import { ResponsiveTabsHeader } from "@/shared/ui/organisms/responsive-tabs-header";

export function UsersHeader() {
  return <ResponsiveTabsHeader items={usersHeaderItems} />;
}
