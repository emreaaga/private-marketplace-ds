import { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Analytics } from "@vercel/analytics/next";

import { APP_CONFIG } from "@/shared/lib/app-config";
import { PreferencesStoreProvider } from "@/shared/styles/preferences-provider";
import { Toaster } from "@/shared/ui/atoms/sonner";
import { AuthProvider } from "@/shared/ui/organisms/sidebar/auth-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.meta.title,
  description: APP_CONFIG.meta.description,
};

type ThemeMode = "light" | "dark";

async function getAuthSession() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh_token");
  if (!refresh) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refresh.value}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();

  return {
    user: {
      id: String(data.user.id),
      role: data.user.role,
    },
    accessToken: data.accessToken,
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();

  const rawTheme = cookieStore.get("theme_mode")?.value;
  const themeMode: ThemeMode = rawTheme === "dark" || rawTheme === "light" ? rawTheme : "light";

  const themePreset = "default";

  const session = await getAuthSession();

  return (
    <html lang="en" className={themeMode} data-theme-preset={themePreset}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <AuthProvider initialSession={session}>
          <PreferencesStoreProvider themeMode={themeMode} themePreset={themePreset}>
            {children}
            <Toaster />
          </PreferencesStoreProvider>
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
