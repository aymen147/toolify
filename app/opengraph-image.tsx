import { ImageResponse } from "next/og";

export const alt = "Toolify — 13 outils gratuits en ligne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fafaf9",
          padding: "80px",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              backgroundColor: "#0a0a0a",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fafaf9",
              fontSize: "44px",
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ fontSize: "40px", fontWeight: 700, color: "#0a0a0a" }}>
            toolify
          </div>
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "78px",
            fontWeight: 700,
            color: "#0a0a0a",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          13 outils gratuits
        </div>
        <div
          style={{
            fontSize: "78px",
            fontWeight: 700,
            color: "#d97706",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          dans ton navigateur
        </div>
        <div
          style={{
            marginTop: "32px",
            fontSize: "32px",
            color: "#525252",
          }}
        >
          Compresser · convertir · fusionner · générer — 100% privé
        </div>
      </div>
    ),
    { ...size },
  );
}
