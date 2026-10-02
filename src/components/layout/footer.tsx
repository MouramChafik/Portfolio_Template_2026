import { site } from "@/content/site";

const updated = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(site.updatedAt));

export function Footer() {
  return (
    <footer className="no-print border-t border-line py-12 text-sm text-ink-muted">
      <div className="frame flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p>
          © {new Date(site.updatedAt).getFullYear()} {site.name}. Mis à jour le{" "}
          <time dateTime={site.updatedAt}>{updated}</time>.
        </p>
        <a href="#top" className="inline-flex min-h-11 items-center font-medium text-ink">
          Haut de page
        </a>
      </div>
    </footer>
  );
}
