import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Gabarit commun des images de partage (Open Graph), 1200 × 630. */

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src/fonts/og");
const expanded = readFile(join(fontDir, "MonaSans-ExpandedExtraBold.ttf"));
const medium = readFile(join(fontDir, "MonaSans-Medium.ttf"));

export async function ogFonts() {
  return [
    { name: "Mona Sans Expanded", data: await expanded, weight: 800 as const, style: "normal" as const },
    { name: "Mona Sans", data: await medium, weight: 500 as const, style: "normal" as const },
  ];
}

/** Décor à droite : papier bleu quadrillé et cadre barré, façon wireframe. */
export function BlueprintPanel() {
  const lines = Array.from({ length: 9 }, (_, i) => i);
  return (
    <div style={{ position: "absolute", top: 0, right: 0, width: 360, height: 630, background: "#1f4e9e", display: "flex" }}>
      {lines.map((i) => (
        <div key={`v${i}`} style={{ position: "absolute", top: 0, left: i * 48, width: 1, height: 630, background: "rgba(234,242,255,0.12)" }} />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <div key={`h${i}`} style={{ position: "absolute", left: 0, top: i * 48, width: 360, height: 1, background: "rgba(234,242,255,0.12)" }} />
      ))}
      <div style={{ position: "absolute", left: 72, top: 200, width: 216, height: 230, border: "1.5px solid rgba(234,242,255,0.7)", display: "flex" }}>
        <svg width="216" height="230" viewBox="0 0 216 230">
          <path d="M0 0 216 230M216 0 0 230" stroke="rgba(234,242,255,0.45)" strokeWidth="1.2" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 72, top: 168, padding: "2px 8px", background: "#eaf2ff", color: "#1f4e9e", fontSize: 16, fontFamily: "Mona Sans" }}>
        Image 4:5
      </div>
      <div style={{ position: "absolute", left: 72, top: 446, height: 14, width: 216, background: "rgba(255,217,74,0.35)" }} />
    </div>
  );
}
