import { create } from "zustand";

export interface AuthUser {
  id: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  setSession: (data: { user: AuthUser; accessToken: string } | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,

  setSession: (data) =>
    set(data ? { user: data.user, accessToken: data.accessToken } : { user: null, accessToken: null }),
}));
