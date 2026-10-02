import localFont from "next/font/local";

/*
 * Polices auto-hébergées (licence SIL OFL 1.1) : aucun appel à un service
 * tiers au chargement de la page, donc rien à déclarer côté RGPD.
 */

/** Mona Sans : texte et titres. Axe de largeur 75–125 %, graisse 200–900. */
export const mona = localFont({
  src: "../fonts/mona-sans-latin.woff2",
  variable: "--font-mona",
  weight: "200 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

