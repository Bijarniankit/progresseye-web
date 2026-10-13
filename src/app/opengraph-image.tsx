import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ProgressEye — Modern Multi-Tenant School Operating System";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "rgb(250, 246, 236)",
        padding: "80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            backgroundColor: "rgb(15, 23, 42)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgb(255, 255, 255)",
            fontSize: "32px",
            fontWeight: 800,
          }}
        >
          P
        </div>
        <span style={{ fontSize: "36px", fontWeight: 700, color: "rgb(15, 23, 42)" }}>
          ProgressEye
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "rgb(30, 27, 75)",
            lineHeight: 1.1,
            maxWidth: "960px",
          }}
        >
          The school workspace that runs itself.
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "rgb(71, 85, 105)",
            maxWidth: "840px",
            lineHeight: 1.4,
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
          color: "rgb(100, 116, 139)",
          fontSize: "20px",
        }}
      >
        <span>progresseye.com</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
