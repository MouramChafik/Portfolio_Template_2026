import { testimonials } from "@/content/home";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/cn";

/** Un témoignage mis en avant à gauche, les autres en colonne à droite. */
export function Testimonials() {
  const [featured, ...others] = testimonials;

  return (
    <section id="retours" aria-labelledby="retours-title" className="py-section">
      <div className="frame">
        <FadeIn>
          <h2 id="retours-title" className="mb-module type-h2">
            Ce qu’en disent les équipes
          </h2>
        </FadeIn>

        <div className="grid gap-module lg:grid-cols-12 lg:gap-x-gutter lg:gap-y-16">
          {[featured, ...others].map((item, index) => (
            <FadeIn
              key={item.name}
              delay={index * 0.1}
              className={cn(index === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-4 lg:col-start-9")}
            >
              <figure>
                <blockquote>
                  <p
                    className={cn(
                      index === 0
                        ? "text-2xl leading-[1.16] font-medium tracking-[-0.018em] text-balance font-stretch-108%"
                        : "type-lede",
                    )}
                  >
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-5 grid gap-0.5 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-ink-muted">{item.role}</span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
