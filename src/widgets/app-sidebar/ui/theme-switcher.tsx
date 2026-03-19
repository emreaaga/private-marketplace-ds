"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { setValueToCookie } from "@/shared/lib/server-actions";
import { applyThemeMode, type ThemeMode } from "@/shared/lib/theme-utils";
import { usePreferencesStore } from "@/shared/styles/preferences-provider";
import { Button } from "@/shared/ui/atoms/button";

const THEME_CYCLE: ThemeMode[] = ["light", "dark", "system"];

interface ThemeSwitcherProps {
  initialTheme: ThemeMode;
}

export function ThemeSwitcher({ initialTheme }: ThemeSwitcherProps) {
  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);

  const cycleTheme = async () => {
    const currentIndex = THEME_CYCLE.indexOf(themeMode);
    const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];

    setThemeMode(nextTheme);
    applyThemeMode(nextTheme);
    await setValueToCookie("theme_mode", nextTheme);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={cycleTheme}
      aria-label={`Current theme mode: ${themeMode || initialTheme}`}
    >
      <Monitor className="hidden size-4 [html[data-theme-mode=system]_&]:block" />
      <Sun className="hidden size-4 dark:block [html[data-theme-mode=system]_&]:hidden" />
      <Moon className="block size-4 dark:hidden [html[data-theme-mode=system]_&]:hidden" />
    </Button>
  );
}
