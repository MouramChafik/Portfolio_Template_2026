import { hero } from "@/content/home";
import { site } from "@/content/site";
import { FadeIn } from "@/components/motion/fade-in";
import { SplitWords } from "@/components/motion/split-words";
import { ButtonLink } from "@/components/ui/button";
import { LocalTime } from "@/components/ui/local-time";
import { LatestProject } from "./latest-project";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-[clamp(2rem,0.5rem+5vw,5rem)] pb-module">
      <div className="frame">
        <FadeIn
          when="mount"
          y={0}
          className="mb-[clamp(1.75rem,0.75rem+3vw,3.5rem)] flex flex-wrap justify-between gap-x-6 gap-y-2 text-sm text-ink-muted"
        >
          <p className="inline-flex items-center gap-3">
            <span
              className={
                site.available
                  ? "size-2 shrink-0 rounded-full bg-success shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-success)_20%,transparent)]"
                  : "size-2 shrink-0 rounded-full bg-line-strong"
              }
              aria-hidden="true"
            />
            {site.availability}
          </p>
          <p>
            {site.city}, <LocalTime timeZone={site.timeZone} />
          </p>
        </FadeIn>

        <h1 id="hero-title" className="type-display max-w-[14.5em]">
          <SplitWords text={hero.title} delay={0.1} />
        </h1>

        <div className="mt-[clamp(2rem,1rem+3vw,4rem)] grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-x-gutter">
          <FadeIn when="mount" delay={0.55} className="lg:col-span-6">
            <p className="type-lede max-w-[44ch]">
              {hero.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#projets">
                Voir les projets
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Écrire à {site.firstName}
              </ButtonLink>
            </div>
          </FadeIn>
          <FadeIn when="mount" delay={0.75} className="lg:col-span-4 lg:col-start-9">
            <LatestProject />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
