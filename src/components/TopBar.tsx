"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface TopBarProps {
  title?: string;
}

export function TopBar({ title = "Community" }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-background">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left - User Avatar */}
        <div className="w-10 flex justify-start">
          <button
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-medium"
            aria-label="User profile"
          >
            JS
          </button>
        </div>

        {/* Center - Title */}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>

        {/* Right - Theme Toggle */}
        <div className="w-10 flex justify-end">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-secondary-foreground/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
