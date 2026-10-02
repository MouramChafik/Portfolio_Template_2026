"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  // Rubrique active (accueil uniquement)
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = site.nav
      .map((item) => document.getElementById(item.href.split("#")[1] ?? ""))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 border-b bg-canvas transition-colors duration-200",
        scrolled ? "border-line" : "border-transparent",
      )}
      style={{ viewTransitionName: "" }}
    >
      <div className="frame flex h-header items-center gap-3 lg:gap-6">
        <Link
          href="/"
          className="mr-auto text-[1.0625rem] font-bold tracking-[-0.01em] whitespace-nowrap no-underline font-stretch-125%"
          transitionTypes={pathname === "/" ? undefined : ["nav-back"]}
        >
          {site.name}
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex gap-1">
            {site.nav.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = pathname === "/" && active === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    transitionTypes={pathname === "/" ? undefined : ["nav-back"]}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-sm px-3 text-sm font-medium no-underline transition-colors duration-200",
                      isActive
                        ? "text-ink underline decoration-2 underline-offset-[0.45em]"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="max-lg:hidden" />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="min-h-11 rounded-full border border-line px-4 type-ui lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} returnFocusTo={menuButton} />
    </header>
  );
}
