/*
 * Typographie française automatique.
 * Le contenu s'écrit au clavier, sans se soucier des espaces spéciales :
 * typoDeep() est appliqué à tout le contenu (src/content) au moment de l'export.
 */

const NNBSP = " "; // espace fine insécable
const NBSP = " "; // espace insécable

/** Clés dont la valeur ne doit jamais être modifiée (chemins, liens, codes). */
const RAW_KEYS = new Set(["slug", "src", "href", "id", "email", "url", "hex", "token", "timeZone", "tone"]);

export function typo(text: string): string {
  return (
    text
      // Points de suspension et apostrophe typographique
      .replace(/\.\.\./g, "…")
      .replace(/'/g, "’")
      // Guillemets français : espace fine à l'intérieur
      .replace(/«\s*/g, `«${NNBSP}`)
      .replace(/\s*»/g, `${NNBSP}»`)
      // Espace fine avant ; ! ? et insécable avant :
      .replace(/([\p{L}\p{N}»)’…])\s*([;!?])/gu, `$1${NNBSP}$2`)
      .replace(/(\S)\s+:/g, `$1${NBSP}:`)
      // Milliers groupés : 1 200, 3 000
      .replace(/(\d)[  ](\d{3})(?!\d)/g, `$1${NNBSP}$2`)
      // Pourcentages et unités collés au nombre : 38 %, 3 500 €, 48 heures
      .replace(/(\d)\s*%/g, `$1${NNBSP}%`)
      .replace(/(\d) (?=[\p{L}€])/gu, `$1${NBSP}`)
  );
}

/** Applique typo() à toutes les chaînes d'un objet de contenu. */
export function typoDeep<T>(value: T, key?: string): T {
  if (typeof value === "string") {
    return (key && RAW_KEYS.has(key) ? value : typo(value)) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => typoDeep(item, key)) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, typoDeep(v, k)]),
    ) as T;
  }
  return value;
}
