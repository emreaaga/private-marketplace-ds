"use client";

import { Moon, Sun } from "lucide-react";

import { setValueToCookie } from "@/shared/lib/server-actions";
import { updateThemeMode } from "@/shared/lib/theme-utils";
import { usePreferencesStore } from "@/shared/styles/preferences-provider";
import { Button } from "@/shared/ui/atoms/button";

export function ThemeSwitcher() {
  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);

  const handleValueChange = async () => {
    const newTheme = themeMode === "dark" ? "light" : "dark";
    updateThemeMode(newTheme);
    setThemeMode(newTheme);
    await setValueToCookie("theme_mode", newTheme);
  };

  return (
    <Button size="icon" onClick={handleValueChange}>
      {themeMode === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
