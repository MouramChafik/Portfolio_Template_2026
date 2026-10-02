import { site } from "@/content/site";
import { ArrowUpRight } from "@/components/ui/icons";

const updated = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})
  .format(new Date(site.updatedAt))
  .replace(/ /g, "\u00A0"); // « 2 octobre 2026 » ne se coupe jamais

export function Footer() {
  return (
    <footer className="no-print border-t border-line py-12 text-sm text-ink-muted">
      <div className="frame flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p>
          © {new Date(site.updatedAt).getFullYear()} {site.name}. Mis à jour le{" "}
          <time dateTime={site.updatedAt}>{updated}</time>.
        </p>
        <p>
          Créé par :{" "}
          <a
            href={site.credit.href}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-1 font-medium text-ink no-underline hover:underline [&_svg]:size-[0.9em]"
          >
            {site.credit.label}
            <ArrowUpRight />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </p>
        <a href="#top" className="inline-flex min-h-11 items-center font-medium text-ink">
          Haut de page
        </a>
      </div>
    </footer>
  );
}
