import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";

/* Générée au build : compatible avec l'export statique. */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    lang: "fr",
    start_url: asset("/"),
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#17203a",
    icons: [
      { src: asset("/icon.svg"), type: "image/svg+xml", sizes: "any" },
      { src: asset("/apple-icon.png"), type: "image/png", sizes: "180x180" },
    ],
  };
}
