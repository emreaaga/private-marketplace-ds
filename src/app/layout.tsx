import { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { APP_CONFIG } from "@/shared/lib/app-config";
import { PreferencesStoreProvider } from "@/shared/styles/preferences-provider";
import { Toaster } from "@/shared/ui/atoms/sonner";

import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.meta.title,
  description: APP_CONFIG.meta.description,
};

type ThemeMode = "light" | "dark";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();

  const rawTheme = cookieStore.get("theme_mode")?.value;
  const themeMode: ThemeMode = rawTheme === "dark" || rawTheme === "light" ? rawTheme : "light";
  const themePreset = "default";

  return (
    <html lang="en" className={themeMode} data-theme-preset={themePreset}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Providers>
          <PreferencesStoreProvider themeMode={themeMode} themePreset={themePreset}>
            {children}
            <Toaster />
          </PreferencesStoreProvider>
        </Providers>
      </body>
    </html>
  );
}
