"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { faq } from "@/content/home";
import { FadeIn } from "@/components/motion/fade-in";

/**
 * Questions fréquentes en accordéon. Les réponses restent dans le HTML même
 * fermées (utile aux moteurs de recherche) ; elles sont aussi décrites en
 * JSON-LD dans la page.
 */
export function Faq() {
  const [open, setOpen] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section id="questions" aria-labelledby="questions-title" className="py-section">
      <div className="frame grid gap-module lg:grid-cols-12 lg:gap-x-gutter">
        <FadeIn className="lg:col-span-5">
          <h2 id="questions-title" className="type-h2">
            Questions fréquentes
          </h2>
        </FadeIn>

        <div className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faq.map((item) => {
            const isOpen = open === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;
            return (
              <div key={item.id} id={`faq-${item.id}`} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="flex min-h-11 w-full items-center justify-between gap-5 py-5 text-left text-lg leading-tight font-semibold font-stretch-106%"
                  >
                    {item.question}
                    <span aria-hidden="true" className="relative size-4 shrink-0">
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-full bg-current" />
                      <motion.span
                        className="absolute top-1/2 left-0 h-[1.5px] w-full bg-current"
                        initial={false}
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                      />
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                  inert={!isOpen}
                >
                  <p className="max-w-[64ch] pb-6 text-ink-muted">{item.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
