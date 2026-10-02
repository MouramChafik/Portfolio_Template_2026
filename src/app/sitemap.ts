import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/projects";
import { site } from "@/content/site";

/* Générée au build : compatible avec l'export statique. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updatedAt);
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((project) => ({
      url: `${site.url}/projets/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
