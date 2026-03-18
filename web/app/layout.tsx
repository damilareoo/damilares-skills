import type { Metadata, Viewport } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "900"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "damilares-skills | 57 Expert AI Modes",
  description:
    "Transform Claude Code from a generic AI into a team of specialists. 57 opinionated skills for real domain expertise.",
  icons: "/favicon.svg",
};

export const viewport: Viewport = {
  themeColor: "#0f1419",
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
