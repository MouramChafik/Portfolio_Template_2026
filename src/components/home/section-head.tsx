import { FadeIn } from "@/components/motion/fade-in";

/** En-tête de section : titre à gauche, introduction alignée en bas à droite. */
export function SectionHead({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="mb-module grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-x-gutter">
      <FadeIn className="lg:col-span-7">
        <h2 id={id} className="type-h2">
          {title}
        </h2>
      </FadeIn>
      {intro && (
        <FadeIn delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[44ch] text-ink-muted">{intro}</p>
        </FadeIn>
      )}
    </div>
  );
}
