import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, IBM_Plex_Serif, Caveat, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["500"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-plex-serif",
  display: "swap",
  weight: ["600"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["700"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Danish® - Software Engineer",
  description: "MS Software Engineering. Building ML systems, infrastructure, and research tooling. San Jose."
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} ${ibmPlexSerif.variable} ${caveat.variable} ${bebas.variable} dark`}>
      <body className="bg-black text-white font-sans antialiased">
        <SmoothScroll>
          <CustomCursor />
          <div className="mx-auto max-w-[2000px] px-[3%] md:px-4 lg:px-9 pt-24">
            {children}
          </div>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}