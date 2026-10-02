import { ImageResponse } from "next/og";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import { BlueprintPanel, ogFonts, ogSize } from "@/lib/og";

export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "#17203a", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 840 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Mona Sans", fontSize: 26, color: "#535d78" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#13804a" }} />
            {site.availability}
          </div>
          <div style={{ display: "flex", fontFamily: "Mona Sans Expanded", fontSize: 66, lineHeight: 1.02, letterSpacing: -2 }}>
            {hero.title}
          </div>
          <div style={{ display: "flex", fontFamily: "Mona Sans", fontSize: 30 }}>
            {`${site.name} · ${site.role}, ${site.city}`}
          </div>
        </div>
        <BlueprintPanel />
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
