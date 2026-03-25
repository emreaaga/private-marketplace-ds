export const branchesKeys = {
  all: ["branches"] as const,
  lists: () => [...branchesKeys.all, "list"] as const,
  lookups: (companyId?: number) => [...branchesKeys.lists(), "lookup", companyId] as const,

  byCompany: (companyId: number) => [...branchesKeys.lists(), "byCompany", companyId] as const,
};
