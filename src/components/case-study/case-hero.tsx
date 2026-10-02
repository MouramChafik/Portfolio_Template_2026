import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { ProjectWithCaseStudy } from "@/content/types";
import { FadeIn } from "@/components/motion/fade-in";
import { MediaReveal } from "@/components/motion/media-reveal";
import { ArrowLeft } from "@/components/ui/icons";
import { TypographicCover } from "@/components/ui/typographic-cover";

/**
 * En-tête d'étude de cas. Les couvertures en portrait passent à droite du
 * texte ; sans image, une couverture typographique est générée.
 */
export function CaseHero({ project }: { project: ProjectWithCaseStudy }) {
  const { caseStudy, cover } = project;
  const landscape = !cover || cover.width > cover.height;

  const coverImage = (
    <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
      {cover ? (
        <MediaReveal onMount className={landscape ? "aspect-[4/3]" : "aspect-[4/5]"}>
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes={landscape ? "(min-width: 90rem) 1344px, 94vw" : "(min-width: 64rem) 40vw, 94vw"}
            loading="eager"
            fetchPriority="high"
            className="size-full object-cover"
          />
        </MediaReveal>
      ) : (
        <TypographicCover name={project.name} tone={project.tone} label={project.summary} className="aspect-[16/9] lg:aspect-[21/9]" />
      )}
    </ViewTransition>
  );

  return (
    <header className="pt-[clamp(1.5rem,0.5rem+3vw,3.5rem)] pb-module">
      <div className="frame">
        <nav aria-label="Fil d’Ariane" className="mb-[clamp(2rem,1rem+3vw,4rem)] text-sm">
          <Link
            href="/#projets"
            transitionTypes={["nav-back"]}
            className="inline-flex min-h-11 items-center gap-2 font-medium text-ink-muted no-underline hover:text-ink [&_svg]:size-4"
          >
            <ArrowLeft /> Tous les projets
          </Link>
        </nav>

        <div className={landscape ? "grid gap-module" : "grid gap-module lg:grid-cols-12 lg:items-end lg:gap-x-gutter"}>
          <div className={landscape ? "grid gap-6 lg:grid-cols-12 lg:gap-x-gutter" : "grid gap-6 lg:col-span-6"}>
            <FadeIn when="mount" className={landscape ? "lg:col-span-8" : ""}>
              <p className="mb-4 text-sm text-ink-muted">
                {project.type}, {project.year}
              </p>
              <h1 className="type-display max-w-[16ch] text-[clamp(2.25rem,0.9rem+5vw,5.5rem)]">
                {caseStudy.title}
              </h1>
            </FadeIn>
            <FadeIn when="mount" delay={0.15} className={landscape ? "lg:col-span-4 lg:self-end" : ""}>
              <p className="type-lede max-w-[46ch]">
                {caseStudy.lede}
              </p>
            </FadeIn>
          </div>

          <div className={landscape ? "" : "lg:col-span-5 lg:col-start-8"}>{coverImage}</div>
        </div>

        <FadeIn when="mount" delay={0.3}>
          <dl className="mt-module grid gap-x-gutter gap-y-5 border-t border-line pt-6 text-sm sm:grid-cols-2 lg:grid-cols-5">
            {caseStudy.meta.map((item) => (
              <div key={item.label} className="grid content-start gap-1">
                <dt className="text-ink-muted">{item.label}</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </header>
  );
}
