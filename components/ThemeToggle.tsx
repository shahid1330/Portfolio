'use client';

import { Moon, Sun } from 'lucide-react';

/**
 * Stateless by design. The blocking script in <head> puts `.dark` on <html>
 * before first paint, and the two icons are swapped by the `dark:` variant —
 * so there is nothing to hydrate and no mismatch between server and client.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Private browsing / storage disabled — the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" />
      <Moon className="h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}
