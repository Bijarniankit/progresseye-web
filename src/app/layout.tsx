import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { RootProvider } from "@/components/providers/root-provider";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display fonts (Poppins 600, 700, 800 normal + 500 italic)
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
  style: ["normal"],
  preload: true,
});

const poppinsItalic = Poppins({
  subsets: ["latin"],
  variable: "--font-display-italic",
  display: "swap",
  weight: ["500"],
  style: ["italic"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "ProgressEye — Calm, Trustworthy School Management",
  description: "Next-generation multi-tenant school operating system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`no-js ${inter.variable} ${poppins.variable} ${poppinsItalic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Early script swaps no-js class before initial paint
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.replace('no-js', 'js')",
          }}
        />
      </head>
      <body className="min-h-dvh antialiased bg-surface text-text">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
