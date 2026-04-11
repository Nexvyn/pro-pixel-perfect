"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/primitives/button"
import { SunIcon } from "./sun"
import { MoonIcon } from "./moon"

export function LightDarkMode() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="transition-all duration-200 hover:-translate-y-px active:translate-y-px shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-2px_0_rgba(0,0,0,0.05)] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(0,0,0,0.08)] active:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),inset_0_2px_2px_rgba(0,0,0,0.08),inset_0_-1px_0_rgba(0,0,0,0.03)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_2px_3px_rgba(255,255,255,0.06),inset_0_-4px_1px_rgba(0,0,0,0.4)] dark:hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12),inset_0_2px_4px_rgba(255,255,255,0.08),inset_0_-4px_1px_rgba(0,0,0,0.5)] dark:active:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_2px_rgba(0,0,0,0.3),inset_0_-2px_1px_rgba(0,0,0,0.25)]"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <SunIcon
        size={20}
        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        size={20}
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
    </Button>
  )
}
