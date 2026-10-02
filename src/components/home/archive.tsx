"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useRef, useState, type PointerEvent } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/icons";
import { TypographicCover } from "@/components/ui/typographic-cover";
import { asset } from "@/lib/asset";

const PREVIEW = { width: 176, height: 120, gap: 24 };

/**
 * « Autres projets », en tableau. Une ligne avec étude de cas est cliquable
 * en entier. Au survol (souris, grand écran), un aperçu apparaît dans l'espace
 * libre de la colonne « Projet », à la hauteur de la ligne, sans masquer de
 * texte ; au clic, il se transforme en couverture de l'étude de cas.
 */
export function Archive({ items }: { items: Project[] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const projectColumn = useRef<HTMLTableCellElement>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 380, damping: 34 });

  function showPreview(event: PointerEvent<HTMLTableRowElement>, item: Project) {
    if (event.pointerType !== "mouse" || !wrapper.current || !projectColumn.current) return;
    const box = wrapper.current.getBoundingClientRect();
    const row = event.currentTarget.getBoundingClientRect();
    const column = projectColumn.current.getBoundingClientRect();

    x.set(column.right - box.left - PREVIEW.width - PREVIEW.gap);
    const top = row.top - box.top + row.height / 2 - PREVIEW.height / 2;
    y.set(top);
    // Première apparition : directement à la bonne hauteur, sans glisser
    if (!hovered) springY.jump(top);
    setHovered(item);
  }

  if (!items.length) return null;

  return (
    <div className="mt-section">
      <h3 className="mb-5 type-h3">Autres projets</h3>
      <div ref={wrapper} className="relative" onPointerLeave={() => setHovered(null)}>
        <table className="w-full border-collapse text-sm lg:table-fixed">
          <thead className="max-md:sr-only" onPointerEnter={() => setHovered(null)}>
            <tr className="border-b border-line-strong text-left text-ink-muted">
              <th scope="col" className="pr-4 pb-3 font-medium lg:w-24">Année</th>
              <th ref={projectColumn} scope="col" className="pr-4 pb-3 font-medium">Projet</th>
              <th scope="col" className="pr-4 pb-3 font-medium lg:w-40">Type</th>
              <th scope="col" className="pb-3 font-medium lg:w-56">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const href = item.caseStudy ? `/projets/${item.slug}` : null;
              return (
                <tr
                  key={item.slug}
                  onPointerEnter={(event) => showPreview(event, item)}
                  className="group relative grid grid-cols-[4rem_1fr] gap-x-3 border-b border-line py-4 transition-colors duration-200 md:table-row md:py-0 md:hover:bg-surface-soft"
                >
                  <td className="tabular row-span-3 text-ink-muted md:w-24 md:py-4 md:pr-4 md:align-top">{item.year}</td>
                  <td className="md:py-4 md:pr-4 md:align-top">
                    {href ? (
                      <Link
                        href={href}
                        transitionTypes={["nav-forward"]}
                        className={cn(
                          "inline-flex items-center gap-1.5 font-semibold no-underline decoration-2 underline-offset-[0.18em] group-hover:underline",
                          // Toute la ligne est cliquable, mais seul le nom est annoncé comme lien
                          "after:absolute after:inset-0 after:content-['']",
                          "focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-focus",
                        )}
                      >
                        {item.name}
                        <ArrowRight className="size-[1em] transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <span className="font-semibold">{item.name}</span>
                    )}
                    <span className="block max-w-[28ch] text-ink-muted">{item.summary}</span>
                  </td>
                  <td className="text-ink-muted md:py-4 md:pr-4 md:align-top md:text-ink">{item.type}</td>
                  <td className="text-ink-muted md:py-4 md:align-top md:text-ink">{item.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <AnimatePresence>
          {hovered && (
            <motion.div
              aria-hidden="true"
              style={{ x, y: springY, width: PREVIEW.width, height: PREVIEW.height }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
              className="pointer-events-none absolute top-0 left-0 z-10 max-lg:hidden"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={hovered.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0"
                >
                  <ViewTransition name={`cover-${hovered.slug}`} share="morph" default="none">
                    {hovered.cover ? (
                      <div className="relative size-full overflow-hidden rounded-md shadow-float">
                        <Image src={asset(hovered.cover.src)} alt="" fill sizes="176px" className="object-cover" />
                      </div>
                    ) : (
                      <TypographicCover compact name={hovered.name} tone={hovered.tone} className="size-full shadow-float" />
                    )}
                  </ViewTransition>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
