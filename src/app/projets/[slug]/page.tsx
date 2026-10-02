import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { caseStudies, getNextProject, getProject } from "@/content/projects";
import { caseStudyJsonLd } from "@/lib/jsonld";
import { Blocks } from "@/components/case-study/blocks";
import { CaseHero } from "@/components/case-study/case-hero";
import { NextProject } from "@/components/case-study/next-project";
import { ReadingProgress } from "@/components/case-study/reading-progress";
import { Results } from "@/components/case-study/results";
import { Toc } from "@/components/case-study/toc";
import { FadeIn } from "@/components/motion/fade-in";
import { JsonLd } from "@/components/ui/json-ld";

/* Une page par projet, générée à la compilation. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.caseStudy.title,
    description: project.caseStudy.lede,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.caseStudy.title,
      description: project.caseStudy.lede,
      url: `/projets/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const { caseStudy } = project;

  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      <main id="contenu">
        <ReadingProgress />
        <CaseHero project={project} />
        <Results results={caseStudy.results} note={caseStudy.resultsNote} />

        <div className="frame grid py-section lg:grid-cols-12 lg:gap-x-gutter">
          <aside className="lg:col-span-3">
            <Toc sections={caseStudy.sections.map(({ id, title }) => ({ id, title }))} />
          </aside>

          <article className="min-w-0 lg:col-span-7 lg:col-start-5">
            {caseStudy.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-titre`}
                className={index === 0 ? undefined : "mt-section"}
              >
                <FadeIn>
                  <h2 id={`${section.id}-titre`} className="type-h2 text-[clamp(1.875rem,1.3rem+2.4vw,3.25rem)]">
                    {section.title}
                  </h2>
                </FadeIn>
                <Blocks blocks={section.blocks} />
              </section>
            ))}
          </article>
        </div>

        <NextProject project={next} />
        <JsonLd data={caseStudyJsonLd(project)} />
      </main>
    </ViewTransition>
  );
}
