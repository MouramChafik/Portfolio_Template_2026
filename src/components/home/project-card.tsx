"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useRef, useState, type PointerEvent } from "react";
import type { FeaturedProject } from "@/content/types";
import { MediaReveal } from "@/components/motion/media-reveal";
import { RichText } from "@/components/ui/rich-text";
import { asset } from "@/lib/asset";

type ProjectCardProps = {
  project: FeaturedProject;
  sizes: string;
  eager?: boolean;
};

/**
 * Carte de projet : toute la carte est cliquable, mais seul le titre est
 * annoncé comme lien. Au survol (souris), un libellé suit le curseur.
 */
export function ProjectCard({ project, sizes, eager = false }: ProjectCardProps) {
  const media = useRef<HTMLDivElement>(null);
  const insideRef = useRef(false);
  const [inside, setInside] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 520, damping: 38, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 520, damping: 38, mass: 0.5 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || !media.current) return;
    const rect = media.current.getBoundingClientRect();
    const isInside =
      event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    // À l'entrée, le libellé apparaît directement sous le curseur
    if (isInside && !insideRef.current) {
      springX.jump(px);
      springY.jump(py);
    }
    insideRef.current = isInside;
    setInside(isInside);
    x.set(px);
    y.set(py);
  }

  function handlePointerLeave() {
    insideRef.current = false;
    setInside(false);
  }

  const ratio = project.cover.width > project.cover.height ? "4:3" : "4:5";

  return (
    <article
      className="group relative grid gap-5"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={media} className="relative">
        <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
          <MediaReveal className={ratio === "4:3" ? "aspect-[4/3]" : "aspect-[4/5]"}>
            <Image
              src={asset(project.cover.src)}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes={sizes}
              loading={eager ? "eager" : "lazy"}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            />
          </MediaReveal>
        </ViewTransition>

        <AnimatePresence>
          {inside && (
            <motion.span
              aria-hidden="true"
              style={{ x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute top-0 left-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-action px-4 py-2 text-sm font-semibold whitespace-nowrap text-on-action shadow-float"
            >
              Lire l’étude de cas
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="type-h3">
            <Link
              href={`/projets/${project.slug}`}
              transitionTypes={["nav-forward"]}
              className="no-underline decoration-2 underline-offset-[0.18em] group-hover:underline after:absolute after:inset-0 after:z-[2] after:rounded-md after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-[6px] focus-visible:after:outline-focus"
            >
              {project.name}
            </Link>
          </h3>
          <span className="tabular shrink-0 text-sm text-ink-muted">{project.year}</span>
        </div>
        <p className="max-w-[48ch] text-ink-muted">{project.summary}</p>
        <p className="font-medium">
          <RichText text={project.result} />
        </p>
        <p className="text-sm text-ink-muted">{project.type}</p>
      </div>
    </article>
  );
}
