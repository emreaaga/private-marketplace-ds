import { create } from "zustand";

import { AllCompanyType } from "@/shared/types/company/company.types";
import { AllUserRoles } from "@/shared/types/users";

export interface AuthUser {
  id: string;
  name: string;
  role: AllUserRoles;
  company_id: number;
  company_name: string;
  company_type: AllCompanyType;
}

interface AuthState {
  user: AuthUser | null;
  setSession: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setSession: (user) => set({ user }),
}));
