"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barre de progression de lecture, sous l'en-tête. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="no-print fixed top-[var(--spacing-header)] right-0 left-0 z-50 h-0.5 origin-left bg-ink"
    />
  );
}
