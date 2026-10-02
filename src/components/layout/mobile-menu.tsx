"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { createPortal } from "react-dom";
import { site } from "@/content/site";
import { Close } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const noop = () => () => {};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
};

/** Menu plein écran : focus piégé, touche Échap, retour du focus au bouton. */
export function MobileMenu({ open, onClose, returnFocusTo }: MobileMenuProps) {
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    const frame = requestAnimationFrame(() => focusables()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const mq = window.matchMedia("(min-width: 64rem)");
    const onResize = () => mq.matches && onClose();
    mq.addEventListener("change", onResize);

    const button = returnFocusTo.current;
    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onResize);
      button?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-80 flex flex-col bg-canvas text-ink"
        >
          <div className="frame flex h-header items-center justify-between">
            <span className="text-[1.0625rem] font-bold font-stretch-125%">{site.name}</span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 type-ui [&_svg]:size-4"
            >
              <Close /> Fermer
            </button>
          </div>

          <nav aria-label="Navigation principale" className="frame py-8">
            <ul className="grid gap-1">
              {site.nav.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <Link href={item.href} onClick={onClose} className="block py-2 type-h2 no-underline">
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="frame mt-auto flex flex-wrap items-center gap-3 border-t border-line py-8"
          >
            <ThemeToggle withLabel />
            <a href={`mailto:${site.email}`} className="ml-auto text-sm font-medium">
              {site.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
