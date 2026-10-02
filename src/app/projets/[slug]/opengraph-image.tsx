import { ImageResponse } from "next/og";
import { caseStudies, getProject } from "@/content/projects";
import { site } from "@/content/site";
import { BlueprintPanel, ogFonts, ogSize } from "@/lib/og";

/* Générée au build : compatible avec l'export statique. */
export const dynamic = "force-static";

export const alt = "Étude de cas";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const first = project?.caseStudy.results[0];
  const firstResult = first
    ? `${first.prefix ?? ""}${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: first.decimals ?? 0 }).format(first.value)}${first.suffix ?? ""} ${first.label}`
    : "";
  const result = (project?.result ?? firstResult).replace(/==/g, "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "#17203a", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 840 }}>
          <div style={{ display: "flex", fontFamily: "Mona Sans", fontSize: 26, color: "#535d78" }}>
            {`Étude de cas · ${project?.type}, ${project?.year}`}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", fontFamily: "Mona Sans Expanded", fontSize: 58, lineHeight: 1.04, letterSpacing: -1.6 }}>
              {project?.caseStudy.title}
            </div>
            {result && (
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", background: "#ffd94a", padding: "6px 14px", fontFamily: "Mona Sans", fontSize: 30 }}>
                  {result}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", fontFamily: "Mona Sans", fontSize: 28 }}>{site.name}</div>
        </div>
        <BlueprintPanel />
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
