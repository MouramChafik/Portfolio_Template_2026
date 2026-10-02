"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";

/**
 * reducedMotion="user" : si la personne a demandé à réduire les animations
 * (réglage du système), Motion supprime les déplacements et ne garde que
 * les fondus.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>{children}</ToastProvider>
    </MotionConfig>
  );
}
