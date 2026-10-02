"use client";

import { motion } from "motion/react";
import { method } from "@/content/home";
import { SectionHead } from "./section-head";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Méthode : une vraie séquence, donc numérotée. Les étapes sont reliées comme
 * un parcours utilisateur ; les liaisons se tracent à l'apparition.
 */
export function Method() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="bg-surface-soft py-section">
      <div className="frame">
        <SectionHead id="methode-title" title="Méthode" intro={method.intro} />

        <motion.ol
          className="grid gap-12 lg:grid-cols-4 lg:gap-gutter"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.35 }}
        >
          {method.steps.map((step, index) => {
            const isLast = index === method.steps.length - 1;
            return (
              <li key={step.title} className="relative grid content-start gap-3 pl-[calc(2.5rem+1.5rem)] lg:pt-[calc(2.5rem+1.5rem)] lg:pl-0">
                <motion.span
                  variants={{ hidden: { scale: 0.5, opacity: 0 }, shown: { scale: 1, opacity: 1 } }}
                  transition={{ delay: index * 0.18, type: "spring", stiffness: 420, damping: 24 }}
                  className="absolute top-0 left-0 z-[1] grid size-10 place-items-center rounded-full border-[1.5px] border-ink bg-canvas text-sm font-bold tabular"
                  aria-hidden="true"
                >
                  {index + 1}
                </motion.span>

                {!isLast && (
                  <motion.span
                    aria-hidden="true"
                    variants={{ hidden: { scaleX: 0, scaleY: 0 }, shown: { scaleX: 1, scaleY: 1 } }}
                    transition={{ delay: index * 0.18 + 0.12, duration: 0.6, ease: EASE }}
                    className="absolute top-10 -bottom-12 left-[calc(1.25rem-0.75px)] w-[1.5px] origin-top bg-ink lg:top-[calc(1.25rem-0.75px)] lg:right-[calc(-1*var(--spacing-gutter))] lg:bottom-auto lg:left-10 lg:h-[1.5px] lg:w-auto lg:origin-left"
                  >
                    <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-px rotate-45 border-r-[1.5px] border-b-[1.5px] border-ink lg:top-1/2 lg:right-0 lg:bottom-auto lg:left-auto lg:translate-x-px lg:-translate-y-1/2 lg:-rotate-45" />
                  </motion.span>
                )}

                <span className="sr-only">Étape {index + 1} : </span>
                <h3 className="pt-1.5 type-h3">{step.title}</h3>
                <p className="text-ink-muted">{step.text}</p>
                <ul className="mt-2 flex flex-wrap gap-2" aria-label="Livrables">
                  {step.deliverables.map((item) => (
                    <li key={item} className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
