import type { NextConfig } from "next";

/*
 * Hébergement statique (GitHub Pages, Netlify, OVH…) : définissez
 * STATIC_EXPORT=true au moment du build, le site est alors exporté en fichiers
 * HTML dans out/. Si le site vit dans un sous-dossier (ex. GitHub Pages :
 * /nom-du-depot), indiquez-le dans NEXT_PUBLIC_BASE_PATH.
 * Le workflow .github/workflows/nextjs.yml règle ces deux variables tout seul.
 * Sur Vercel ou avec npm run dev, rien à faire.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  basePath,
  ...(staticExport && {
    output: "export",
    // L'optimisation d'images à la volée demande un serveur
    images: { unoptimized: true },
    // Chaque page devient dossier/index.html : les liens directs et les
    // rechargements fonctionnent sur les hébergeurs statiques
    trailingSlash: true,
  }),
};

export default nextConfig;
