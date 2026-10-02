"use client";

import { motion, type HTMLMotionProps } from "motion/react";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** "mount" : au chargement ; "view" : à l'entrée dans l'écran (une seule fois). */
  when?: "mount" | "view";
  y?: number;
};

/** Apparition douce (fondu + légère montée). À réserver aux moments clés. */
export function FadeIn({ delay = 0, when = "view", y = 20, children, ...props }: FadeInProps) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      {...(when === "mount" ? { animate: target } : { whileInView: target, viewport: { once: true, amount: 0.3 } })}
      transition={{ delay, duration: 0.7, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type FadeInItemProps = HTMLMotionProps<"li"> & { delay?: number; y?: number };

/** Variante <li> de FadeIn, pour animer les éléments d'une liste. */
export function FadeInItem({ delay = 0, y = 20, children, ...props }: FadeInItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      {...props}
    >
      {children}
    </motion.li>
  );
}
