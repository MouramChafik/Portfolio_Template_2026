import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* Même signe que icon.svg : un cadre sélectionné, poignée jaune. */
export default function AppleIcon() {
  const handle = (left: number, top: number, color = "#17203a", border = "#eaf2ff") => (
    <div style={{ position: "absolute", left, top, width: 22, height: 22, background: color, border: `7px solid ${border}` }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#17203a", position: "relative" }}>
        <div style={{ position: "absolute", left: 50, top: 50, width: 80, height: 80, border: "9px solid #eaf2ff" }} />
        {handle(39, 39)}
        {handle(119, 39)}
        {handle(39, 119)}
        {handle(119, 119, "#ffd94a", "#ffd94a")}
      </div>
    ),
    size,
  );
}
