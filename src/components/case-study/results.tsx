import type { Result } from "@/content/types";
import { Counter } from "@/components/motion/counter";
import { FadeInItem } from "@/components/motion/fade-in";

/**
 * Résultats chiffrés, suivis de la méthode de mesure : un chiffre sans
 * source ne convainc personne (ni les recruteurs, ni les moteurs de réponse).
 */
export function Results({ results, note }: { results: Result[]; note?: string }) {
  if (!results.length) return null;

  return (
    <section aria-labelledby="chiffres-cles" className="bg-surface-soft py-module">
      <div className="frame">
        <h2 id="chiffres-cles" className="sr-only">
          Chiffres clés
        </h2>
        <ul className="grid gap-10 md:grid-cols-3 md:gap-gutter">
          {results.map((result, index) => (
            <FadeInItem
              key={result.label}
              delay={index * 0.1}
              className="grid content-start justify-items-start gap-4 border-t-2 border-ink pt-6"
            >
              <span className="text-[clamp(2.75rem,1.6rem+4.4vw,5.25rem)] leading-none font-extrabold tracking-display font-stretch-125%">
                {/* inline-block : le jaune épouse la boîte du chiffre, sans déborder sur le filet ni sur le texte */}
                <mark className="mx-0 inline-block rounded-[0.08em] px-[0.14em] py-[0.06em] leading-none">
                  <Counter value={result.value} decimals={result.decimals} prefix={result.prefix} suffix={result.suffix} />
                </mark>
              </span>
              <span className="max-w-[28ch] text-ink-muted">{result.label}</span>
            </FadeInItem>
          ))}
        </ul>
        {note && (
          <p className="mt-10 max-w-[72ch] text-sm text-ink-muted">
            <span className="font-semibold text-ink">Comment ces chiffres ont été mesurés.</span> {note}
          </p>
        )}
      </div>
    </section>
  );
}
