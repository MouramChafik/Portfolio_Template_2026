/** Sous-dossier du site (ex. "/Portfolio_Template_2026" sur GitHub Pages), vide sinon. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Chemin d'un fichier de public/ (ex. "/images/portrait.svg"), préfixé du
 * sous-dossier du site : next/image ne l'ajoute pas tout seul.
 */
export function asset(path: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
