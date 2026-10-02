"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { ArrowRight } from "@/components/ui/icons";

/** Grand lien vers le projet suivant ; la flèche avance au survol. */
export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Projet suivant" className="border-t border-line py-section">
      <div className="frame">
        <motion.div initial="rest" whileHover="hover" animate="rest">
          <Link
            href={`/projets/${project.slug}`}
            transitionTypes={["nav-forward"]}
            className="group grid gap-3 no-underline"
          >
            <span className="text-sm text-ink-muted">Projet suivant</span>
            <span className="flex items-center gap-[0.3em] type-display text-[clamp(2.5rem,1rem+6vw,6rem)] group-hover:underline group-hover:decoration-[0.06em] group-hover:underline-offset-[0.1em]">
              {project.name}
              <motion.span
                aria-hidden="true"
                variants={{ rest: { x: 0 }, hover: { x: "0.15em" } }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="inline-flex [&_svg]:size-[0.7em] [&_svg]:stroke-[1.5]"
              >
                <ArrowRight />
              </motion.span>
            </span>
            <span className="max-w-[48ch] text-ink-muted">{project.summary}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
