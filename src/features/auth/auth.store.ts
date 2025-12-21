import { create } from "zustand";

import { UserRole } from "@/shared/lib/rbac/roles";

interface User {
  id: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
