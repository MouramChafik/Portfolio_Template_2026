"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { storage, themeStore } from "@/lib/stores";
import { runViewTransition } from "@/lib/view-transition";
import { Moon, Sun } from "@/components/ui/icons";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("is-dark", dark);
  themeStore.emit();
}

/** Bouton soleil / lune. Sans choix enregistré, le thème suit le système. */
export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const isDark = useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot, themeStore.getServerSnapshot);

  // Suit le thème du système tant que la personne n'a rien choisi
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!document.documentElement.dataset.theme) applyTheme(query.matches);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = isDark ? "light" : "dark";
    runViewTransition(() => {
      document.documentElement.dataset.theme = next;
      applyTheme(next === "dark");
    }, "vt-theme");
    storage.set("localStorage", "theme", next);
  }

  const label = isDark ? "Passer au thème clair" : "Passer au thème sombre";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={withLabel ? undefined : label}
      className={cn(
        "inline-grid min-h-11 min-w-11 place-items-center rounded-full border border-line",
        "transition-colors duration-200 hover:border-line-strong hover:bg-surface-soft",
        withLabel && "inline-flex gap-2 px-4 type-ui",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="inline-flex [&_svg]:size-5"
        >
          {isDark ? <Sun /> : <Moon />}
        </motion.span>
      </AnimatePresence>
      {withLabel && <span>{isDark ? "Thème clair" : "Thème sombre"}</span>}
    </button>
  );
}
