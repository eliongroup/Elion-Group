import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const serif = readFile(join(process.cwd(), "assets/fonts/Marcellus-Regular.ttf"));
const sans = readFile(join(process.cwd(), "assets/fonts/Inter-Medium.ttf"));

/** Brand-styled Open Graph image: ivory ground, serif title, gold rule, wordmark. */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [serifData, sansData] = await Promise.all([serif, sans]);
  const gold = "linear-gradient(90deg, #C9A96E, #B8955A, #9E7B3F)";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF8F3",
          padding: "72px 88px",
          color: "#1A1A1A",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ fontFamily: "Marcellus", fontSize: 40, letterSpacing: 14 }}>ELION</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8, width: 170 }}>
            <div style={{ height: 1, flex: 1, backgroundImage: gold }} />
            <div style={{ fontFamily: "Inter", fontSize: 11, letterSpacing: 5, color: "#6B6B6B", marginLeft: 10 }}>
              GROUP
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Inter", fontSize: 18, letterSpacing: 5, color: "#6B6B6B" }}>
            <div style={{ width: 56, height: 1, backgroundImage: gold, marginRight: 20 }} />
            {eyebrow.toUpperCase()}
          </div>
          <div style={{ fontFamily: "Marcellus", fontSize: 76, lineHeight: 1.08, textTransform: "uppercase", letterSpacing: 3, marginTop: 28, maxWidth: 980 }}>{title}</div>
        </div>

        <div style={{ display: "flex", height: 2, width: "100%", backgroundImage: gold }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Marcellus", data: serifData, weight: 400, style: "normal" },
        { name: "Inter", data: sansData, weight: 500, style: "normal" },
      ],
    },
  );
}
