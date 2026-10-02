import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

const grid =
  "linear-gradient(rgb(234 242 255 / 0.09) 1px, transparent 1px), linear-gradient(90deg, rgb(234 242 255 / 0.09) 1px, transparent 1px), linear-gradient(rgb(234 242 255 / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(234 242 255 / 0.035) 1px, transparent 1px)";

const crossed =
  "linear-gradient(to top right, transparent calc(50% - 0.6px), rgb(234 242 255 / 0.3) calc(50% - 0.6px), rgb(234 242 255 / 0.3) calc(50% + 0.6px), transparent calc(50% + 0.6px)), linear-gradient(to bottom right, transparent calc(50% - 0.6px), rgb(234 242 255 / 0.3) calc(50% - 0.6px), rgb(234 242 255 / 0.3) calc(50% + 0.6px), transparent calc(50% + 0.6px))";

/* Une page qui n'existe pas n'a jamais dépassé le stade du wireframe. */
export default function NotFound() {
  return (
    <main
      id="contenu"
      className="relative overflow-hidden bg-blueprint text-blueprint-ink"
      style={{ backgroundImage: grid, backgroundSize: "96px 96px, 96px 96px, 12px 12px, 12px 12px" }}
    >
      <div className="frame grid min-h-[calc(100dvh-var(--spacing-header))] content-center gap-10 py-section lg:grid-cols-12 lg:gap-x-gutter">
        <div className="grid content-start gap-6 lg:col-span-7">
          <p className="w-fit rounded-xs bg-blueprint-ink px-2 py-0.5 font-mono text-xs text-blueprint">
            Erreur 404 · page non construite
          </p>
          <h1 className="type-display text-[clamp(2.5rem,1rem+5vw,5.25rem)] text-transparent [-webkit-text-stroke:1.15px_var(--color-blueprint-ink)]">
            Cette page n’a jamais dépassé le stade du wireframe.
          </h1>
          <p className="type-lede max-w-[40ch] text-blueprint-muted">
            Le lien est peut-être ancien, ou la page a été déplacée. Les projets, eux, sont bien construits.
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <PlanLink href="/" variant="primary" icon={<ArrowLeft />} iconSide="left">
              Retour à l’accueil
            </PlanLink>
            <PlanLink href="/#projets" variant="outline" icon={<ArrowRight />} iconSide="right">
              Voir les projets
            </PlanLink>
          </div>
        </div>

        <div className="relative hidden aspect-[4/3] lg:col-span-4 lg:col-start-9 lg:block" aria-hidden="true">
          <div className="absolute inset-0 rounded-md outline-1 outline-blueprint-ink/60" style={{ background: crossed }} />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xs bg-blueprint-ink px-2 py-0.5 font-mono text-[10px] whitespace-nowrap text-blueprint">
            contenu manquant · 404
          </span>
          <span className="absolute -top-7 left-0 font-mono text-[10px] text-marker">↔ largeur inconnue</span>
        </div>
      </div>
    </main>
  );
}

type PlanLinkProps = {
  href: string;
  variant: "primary" | "outline";
  icon: ReactNode;
  iconSide: "left" | "right";
  children: ReactNode;
};

/**
 * Liens de la 404, au style du plan. Au survol, le lien secondaire se
 * « sélectionne » comme un calque dans un outil de design : contour plein et
 * poignées aux coins (la poignée jaune rappelle l'icône du site).
 */
function PlanLink({ href, variant, icon, iconSide, children }: PlanLinkProps) {
  const iconNode = (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex transition-transform duration-200 ease-out [&_svg]:size-[1.15em]",
        iconSide === "left" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1",
      )}
    >
      {icon}
    </span>
  );

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-5 type-ui no-underline",
        "transition-[background-color,border-color] duration-200 ease-out active:translate-y-px",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marker",
        variant === "primary"
          ? "bg-blueprint-ink text-blueprint hover:bg-white"
          : "border border-dashed border-blueprint-ink/70 text-blueprint-ink hover:border-solid hover:border-blueprint-ink hover:bg-blueprint-ink/10",
      )}
    >
      {iconSide === "left" && iconNode}
      {children}
      {iconSide === "right" && iconNode}

      {variant === "outline" &&
        ["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((position, index) => (
          <span
            key={position}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute size-2 border opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100",
              position,
              index === 3 ? "border-marker bg-marker" : "border-blueprint-ink bg-blueprint",
            )}
          />
        ))}
    </Link>
  );
}
