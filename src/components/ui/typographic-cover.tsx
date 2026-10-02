import { cn } from "@/lib/cn";

const DEFAULT_TONE: [string, string] = ["#edf0f5", "#17203a"];

type TypographicCoverProps = {
  name: string;
  /** [fond, texte], choisissez un contraste d'au moins 4,5:1. */
  tone?: [string, string];
  /** Petite ligne en haut à gauche (version grande uniquement). */
  label?: string;
  /** Version réduite : aperçu au survol des « Autres projets ». */
  compact?: boolean;
  className?: string;
};

/** Couverture générée pour les projets sans image : leur nom, sur leurs deux couleurs. */
export function TypographicCover({ name, tone = DEFAULT_TONE, label, compact = false, className }: TypographicCoverProps) {
  const [background, ink] = tone;

  return (
    <div
      className={cn(
        "relative isolate grid overflow-hidden rounded-md",
        compact ? "place-items-center p-4" : "content-between p-[clamp(1.25rem,0.75rem+2.5vw,3rem)]",
        className,
      )}
      style={{ backgroundColor: background, color: ink }}
    >
      {/* Disque décoratif, coupé par le bord du cadre */}
      <span
        aria-hidden="true"
        className="absolute -top-1/3 -right-[12%] -z-10 aspect-square w-[62%] rounded-full opacity-15"
        style={{ backgroundColor: ink }}
      />
      {!compact && label && <span className="max-w-[32ch] text-sm font-semibold">{label}</span>}
      <span
        className={cn(
          "font-extrabold tracking-display font-stretch-125%",
          compact ? "text-center text-lg leading-none" : "text-[clamp(2.5rem,1rem+6vw,7rem)] leading-[0.92]",
        )}
      >
        {name}
      </span>
    </div>
  );
}
