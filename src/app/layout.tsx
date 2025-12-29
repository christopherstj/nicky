import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro, Great_Vibes } from "next/font/google";
import "./globals.css";

// Display font - dramatic headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Body font - refined, readable serif
const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Script font - handwritten flourishes
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicholas Popkey | Narrative Director",
  description:
    "Gothic interactive portfolio showcasing the narrative direction of Nicholas Popkey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${crimsonPro.variable} ${greatVibes.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
