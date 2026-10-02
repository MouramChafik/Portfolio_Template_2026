/**
 * Script exécuté pendant la lecture du HTML, avant le premier affichage.
 * Côté client, le type passe en text/plain pour que React ne le réexécute pas.
 * (Modèle recommandé par la documentation Next.js : « Preventing flash ».)
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
