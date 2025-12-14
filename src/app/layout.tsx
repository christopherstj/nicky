import type { Metadata } from "next";
import { Cinzel, Crimson_Text } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-gothic-sans",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  variable: "--font-gothic-serif",
  weight: ["400", "600", "700"],
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
      <body className={`${cinzel.variable} ${crimson.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
