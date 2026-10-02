"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  /** Animation au chargement plutôt qu'au défilement (image d'en-tête). */
  onMount?: boolean;
};

/**
 * Cadre d'image qui s'ouvre (masque qui s'élargit + léger dézoom) quand il
 * entre dans l'écran.
 */
export function MediaReveal({ children, className, onMount = false }: MediaRevealProps) {
  const hidden = { clipPath: "inset(9% 7% 9% 7% round 12px)" };
  const shown = { clipPath: "inset(0% 0% 0% 0% round 12px)" };
  const trigger = onMount
    ? { animate: shown }
    : { whileInView: shown, viewport: { once: true, amount: 0.2 } };

  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-md bg-surface", className)}
      initial={hidden}
      {...trigger}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <motion.div
        className="size-full"
        initial={{ scale: 1.12 }}
        {...(onMount ? { animate: { scale: 1 } } : { whileInView: { scale: 1 }, viewport: { once: true, amount: 0.2 } })}
        transition={{ duration: 1.4, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
