"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Chiffre qui défile jusqu'à sa valeur quand il apparaît.
 * La valeur finale est rendue côté serveur (SEO, sans JS) et annoncée telle
 * quelle aux lecteurs d'écran.
 */
export function Counter({ value, decimals = 0, prefix = "", suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const format = useMemo(() => {
    const number = new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    // Espace fine insécable avant %, s, € ; rien avant /5
    const unit = suffix && /^[\p{L}%€]/u.test(suffix) ? ` ${suffix}` : suffix;
    return (n: number) => `${prefix}${number.format(n)}${unit}`;
  }, [decimals, prefix, suffix]);

  const finalText = format(value);

  // Avant l'apparition, on repart de zéro (sauf si les animations sont réduites)
  useEffect(() => {
    if (reduce || inView || !ref.current) return;
    ref.current.textContent = format(0);
  }, [reduce, inView, format]);

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, format]);

  return (
    <>
      <span className="sr-only">{finalText}</span>
      <span ref={ref} aria-hidden="true" className="tabular" suppressHydrationWarning>
        {finalText}
      </span>
    </>
  );
}
