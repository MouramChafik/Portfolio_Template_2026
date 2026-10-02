"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Sommaire collant, avec un repère qui glisse vers la section lue. */
export function Toc({ sections }: { sections: { id: string; title: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Sommaire" className="sticky top-[calc(var(--spacing-header)+2rem)] hidden lg:block">
      <p className="mb-4 text-sm font-semibold">Sommaire</p>
      <ol className="grid border-l border-line">
        {sections.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-marker"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  className="absolute top-0 bottom-0 -left-px w-0.5 bg-ink"
                  aria-hidden="true"
                />
              )}
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "block py-1.5 pl-4 text-sm no-underline transition-colors duration-200",
                  isActive ? "font-semibold text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
