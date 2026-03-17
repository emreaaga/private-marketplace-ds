import { create } from "zustand";

import { AllCompanyType } from "@/entities/company";
import { AllUserRoles } from "@/entities/user";

export interface SessionUser {
  id: string;
  name: string;
  role: AllUserRoles;
  company_id: number;
  company_name: string;
  company_type: AllCompanyType;
}

interface SessionState {
  user: SessionUser | null;
  isAuth: boolean;
  setSession: (user: SessionUser | null) => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  user: null,
  isAuth: false,
  setSession: (user) => set({ user, isAuth: !!user }),
}));
