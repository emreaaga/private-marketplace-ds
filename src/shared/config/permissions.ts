import { AllCompanyType } from "@/shared/types/company/company.types";
import { AllUserRoles } from "@/shared/types/users";

export interface AccessRule {
  roles?: AllUserRoles[];
  companyTypes?: AllCompanyType[];
}

/**
 * ЦЕНТРАЛЬНЫЙ КОНФИГ ДОСТУПОВ (Zero Trust)
 * Если пути нет в списке — доступ ЗАПРЕЩЕН всем.
 */
export const ROUTE_PERMISSIONS: Record<string, AccessRule> = {
  "/dashboard/main": {},
  "/dashboard/wallet": {},
  "/dashboard/unauthorized": {},

  // SETTINGS
  "/dashboard/settings/roles": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/settings/categories": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },

  // USERS
  "/dashboard/users/companies": {
    roles: ["admin"],
  },
  "/dashboard/users/services": {
    roles: ["admin", "company_owner"],
    companyTypes: ["platform", "postal"],
  },
  "/dashboard/users/clients": {
    roles: ["admin", "company_owner"],
    companyTypes: ["platform", "postal"],
  },
  "/dashboard/users/main": {
    roles: ["admin", "company_owner"],
    companyTypes: ["platform", "postal", "customs_broker"],
  },

  // MAIN LOGISTICS
  "/dashboard/test/flights": {
    roles: ["admin", "company_owner"],
    companyTypes: ["postal", "platform", "air_partner", "customs_broker"],
  },
  "/dashboard/test/shipments": {
    roles: ["admin", "company_owner"],
    companyTypes: ["postal", "platform"],
  },
  "/dashboard/test/orders": {
    roles: ["admin", "company_owner"],
    companyTypes: ["platform", "postal"],
  },
  "/dashboard/test/incoming-orders": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },

  "/dashboard/test/:id/orders": {
    roles: ["admin", "company_owner"],
    companyTypes: ["postal", "platform"],
  },

  "/dashboard/test/:id/flight-finance": {
    roles: ["admin", "company_owner"],
    companyTypes: ["postal", "platform"],
  },

  "/dashboard/test/:id/shipments": {
    roles: ["admin", "company_owner"],
    companyTypes: ["platform", "postal", "customs_broker"],
  },

  "/dashboard/test/orders/:id/finance": {
    roles: ["admin", "company_owner"],
    companyTypes: ["platform", "postal"],
  },

  // SELLER
  "/dashboard/seller/orders": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/seller/main": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/seller/order-cart": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/seller/store": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },

  // CLIENTS
  "/dashboard/clients/orders": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/clients/access": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/clients/main": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },

  // LOGISTICS
  "/dashboard/logistics/flights": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/logistics/main": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/logistics/orders": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
  "/dashboard/logistics/shipments": {
    roles: ["admin"],
    companyTypes: ["platform"],
  },
};

export function canAccess(path: string, user: { role: AllUserRoles; company_type: AllCompanyType }): boolean {
  const normalizedPath = path.replace(/\/\d+(?=\/|$)/g, "/:id");

  const matchedPath = Object.keys(ROUTE_PERMISSIONS)
    .sort((a, b) => b.length - a.length)
    .find((key) => normalizedPath.startsWith(key));

  const rule = matchedPath ? ROUTE_PERMISSIONS[matchedPath] : null;

  if (!rule) return false;

  const hasRole = !rule.roles || rule.roles.includes(user.role);
  const hasType = !rule.companyTypes || rule.companyTypes.includes(user.company_type);

  return hasRole && hasType;
}
