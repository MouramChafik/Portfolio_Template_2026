import Image from "next/image";
import { profile } from "@/content/home";
import { FadeIn } from "@/components/motion/fade-in";
import { MediaReveal } from "@/components/motion/media-reveal";

export function Profile() {
  return (
    <section id="profil" aria-labelledby="profil-title" className="py-section">
      <div className="frame grid gap-module lg:grid-cols-12 lg:gap-x-gutter">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+2rem)] lg:col-span-4 lg:self-start">
          <MediaReveal className="aspect-[4/5] max-w-[26rem]">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={profile.portrait.width}
              height={profile.portrait.height}
              sizes="(min-width: 64rem) 30vw, 90vw"
              className="size-full object-cover"
            />
          </MediaReveal>
        </div>

        <div className="grid content-start gap-stack lg:col-span-7 lg:col-start-6">
          <FadeIn>
            <h2 id="profil-title" className="type-h2">
              Profil
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="grid max-w-[64ch] gap-4">
            <p className="type-lede">{profile.lead}</p>
            {profile.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-ink-muted">
                {paragraph}
              </p>
            ))}
          </FadeIn>

          <div className="mt-5 grid gap-12 md:grid-cols-2 md:gap-x-gutter">
            <FadeIn delay={0.1}>
              <h3 className="mb-4 text-base font-bold font-stretch-110%">Parcours</h3>
              <ol className="grid gap-5">
                {profile.timeline.map((step, index) => (
                  <li
                    key={step.role}
                    className={`grid gap-0.5 border-l-2 pl-5 ${index === 0 ? "border-ink" : "border-line"}`}
                  >
                    <span className="tabular text-sm text-ink-muted">{step.period}</span>
                    <span className="font-semibold">{step.role}</span>
                    <span className="text-sm text-ink-muted">{step.org}</span>
                  </li>
                ))}
              </ol>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h3 className="mb-4 text-base font-bold font-stretch-110%">Compétences</h3>
              <ul className="mb-8 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-line px-3 py-1 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
              <h3 className="mb-4 text-base font-bold font-stretch-110%">Outils</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.tools.map((tool) => (
                  <li key={tool} className="rounded-full border border-line px-3 py-1 text-sm">
                    {tool}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
