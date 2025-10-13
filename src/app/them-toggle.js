"use client";

import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FaMoon className="h-4 w-4  "></FaMoon>
    </button>
  );
}
