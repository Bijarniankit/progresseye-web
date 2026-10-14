import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ogTheme } from "@/config/og-theme";

export const alt = "ProgressEye — Modern Multi-Tenant School Operating System";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const [poppinsBoldData, interRegularData] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "src/assets/fonts/poppins-bold.woff")),
    fs.readFile(path.join(process.cwd(), "src/assets/fonts/inter-regular.woff")),
  ]);

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: ogTheme.background,
        padding: "80px",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            backgroundColor: ogTheme.slateDark,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: ogTheme.white,
            fontSize: "32px",
            fontWeight: 700,
            fontFamily: "Poppins",
          }}
        >
          P
        </div>
        <span
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: ogTheme.slateDark,
            fontFamily: "Poppins",
          }}
        >
          ProgressEye
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: ogTheme.headline,
            lineHeight: 1.1,
            maxWidth: "960px",
            fontFamily: "Poppins",
          }}
        >
          The school workspace that runs itself.
        </div>
        <div
          style={{
            fontSize: "26px",
            color: ogTheme.bodyText,
            maxWidth: "840px",
            lineHeight: 1.4,
            fontFamily: "Inter",
          }}
        >
          Calm, trustworthy school operating platform for attendance, academics, fees, and
          communication.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: ogTheme.mutedText,
          fontSize: "20px",
          fontFamily: "Inter",
        }}
      >
        <span>progresseye.com</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Poppins",
          data: poppinsBoldData,
          style: "normal",
          weight: 700,
        },
        {
          name: "Inter",
          data: interRegularData,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
